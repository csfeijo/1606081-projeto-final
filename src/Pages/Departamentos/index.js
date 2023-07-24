import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import getDepartamentos from '../../services/departamentos'
import { ProgressBar } from 'primereact/progressbar'


const Departamentos = () => {

  const [departamentos, setDepartamentos] = useState()

  const loadDepartamentos = async () => {
    try {
      const result = await getDepartamentos()
      console.log(result)
      setDepartamentos(result.data)
    } catch(e) {
      console.log('ERRO na API', e)
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
      {/* Só deve aparecer como Loader enquanto espera o retorno da API */}
      <ProgressBar
        mode='indeterminate'
        className='!absolute top-0 left-0 w-full !h-[2px]'
      />
      {/* Leiam sobre a property loading do DataTable */}

      <h1 className='text-xl my-6'>
        <i className='pi pi-list mr-4'/>
        Listagem de Departamentos
      </h1>

      <DataTable 
        value={departamentos}
        emptyMessage='Nenhum departamento encontrado'
        paginator
        rows={4}
      >
        <Column
          header='Nome'
          field='nome'
        />
        <Column
          header='Sigla'
          field='sigla'
        />
      </DataTable>
    </>
  )
}

export default Departamentos