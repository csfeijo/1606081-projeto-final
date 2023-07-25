import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import getDepartamentos, { deleteDepartamento } from '../../services/departamentos'


const Departamentos = () => {
  const toast = useRef(null)
  const [departamentos, setDepartamentos] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const loadDepartamentos = async () => {
    try {
      const result = await getDepartamentos()
      console.log(result)
      setDepartamentos(result.data)
      setIsLoading(false)
    } catch(e) {
      console.log('ERRO na API', e)
    }
  }

  const removeDepartamento = async (id_departamento) => {
    try{
      await deleteDepartamento({
        id_departamento
      })

      toast.current.show({
        summary: 'SUCESSO',
        detail: 'Departamento excluído.',
        severity: 'success'
      })
      loadDepartamentos()
    } catch(e) {
      let detail = ''
      if (e.response.data.exception && e.response.data.exception.code) {
        if (e.response.data.exception.code === 'ER_ROW_IS_REFERENCED_2') {
          detail = 'Existem funcionários vinculados ao Departamento.'
        }
      } else {
        detail = 'Departamento não encontrado.'
        loadDepartamentos()
      }
      toast.current.show({
        summary: 'ERRO',
        detail,
        severity: 'error'
      })
    }
  }

  // Monitora o state departamentos e caso null chama a API
  useEffect(() => {
    if (!departamentos) {
      loadDepartamentos()
    }
  }, [departamentos])

  return (
    <>      
      <ProgressBar
        mode='indeterminate'
        hidden={!isLoading}
        className='!absolute top-0 left-0 w-full !h-[2px]'
      />

      <h1 className='text-xl my-6'>
        <i className='pi pi-list mr-4'/>
        Listagem de Departamentos
      </h1>

      <DataTable 
        value={departamentos}
        emptyMessage='Nenhum departamento encontrado'
        paginator
        rows={4}
        loading={isLoading}
        pt={{
          'loadingOverlay': {
            className: '!bg-gray-500 !bg-opacity-10'
          }
        }}
      >
        <Column
          header='Nome'
          field='nome'
          sortable
        />
        <Column
          header='Sigla'
          field='sigla'
          sortable
        />
        <Column
          body={(depto) => (
            <Button 
              icon='pi pi-trash'
              severity='danger'
              rounded
              onClick={() => {

                confirmDialog({
                  header: 'Exclusão de Departamento',
                  message: `Você deseja remover ${depto.nome}?`,
                  icon: 'pi pi-info-circle',
                  draggable: false,
                  acceptLabel: 'Sim',
                  acceptClassName: 'p-button-danger',
                  acceptIcon: 'pi pi-check-circle',
                  rejectLabel: 'Não',
                  className: 'w-[400px]',
                  accept: () => {
                    removeDepartamento(depto.id_departamento)
                  },
                  reject: () => { console.log('cancelou') }
                })

              }}
            />
          )}
        />
      </DataTable>
      <ConfirmDialog/>
      <Toast ref={toast}/>
    </>
  )
}

export default Departamentos