import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { 
  getDepartamentoById, 
  insertDepartamento, 
  updateDepartamento
} from '../../services/departamentos'

const FormDepartamentos = () => {
  const { id_departamento } = useParams()

  const navigate = useNavigate()
  // Configura os states
  const [nome, setNome] = useState('')
  const [erroNome, setErroNome] = useState(false)
  const [sigla, setSigla] = useState('')
  const [erroSigla, setErroSigla] = useState(false)
  const [erro, setErro] = useState('')
  const [erroCritico, setErroCritico] = useState('')
  
  // Seta as referencias de nodos do form
  const nomeInputRef = useRef(null)
  const siglaInputRef = useRef(null)

  const formValidate = () => {
    // Primeiro limpa as mensagens de erro
    setErro('')
    setErroNome(false)
    setErroSigla(false)

    if (nome === '') {
      setErro('Nome inválido...')
      setErroNome(true)
      nomeInputRef.current.focus()
      return false
    }

    if (sigla === '') {
      setErro('Sigla inválida...')
      setErroSigla(true)
      siglaInputRef.current.focus()
      return false
    }

    return true
  }

  const saveDepartamento = async () => {
    try {
      if (id_departamento) {
        await updateDepartamento({ nome, sigla, id_departamento })
      } else {
        await insertDepartamento({ nome, sigla })
      }
      navigate('/departamentos')
    } catch (e) {
      const { code } = e.response.data.exception

      if (code === 'ER_DUP_ENTRY') {
        setErro('Registro duplicado na base de dados.')
      } else {
        const termo = id_departamento ? 'edição' : 'inserção'
        setErro(`Erro na ${termo} do registro.`)
      }
    }
  }

  const loadDepartamento = async () => {
    try {
      const resp = await getDepartamentoById({ id_departamento })
      
      const [{ nome, sigla }] = resp.data
      setNome(nome)
      setSigla(sigla)

    } catch(e) {
      navigate('/departamentos')
    }
  }

  useEffect(() => {
    if (id_departamento) {
      if(isNaN(parseInt(id_departamento))) {
        setErroCritico('Identificador inválido')
      } else {
        loadDepartamento()
      }
    }
  },[])

  return (
    <>
      <h1 className='text-xl my-6'>
        <i className='pi pi-plus mr-4'/>
        {id_departamento ? 'Edição' : 'Cadastro' } de Departamento
      </h1>
    
      {erroCritico !== '' &&
        <>
          <Message
            severity='error'
            text={erroCritico}
            className='w-full'
          />
          <Button
            className='!mt-6'
            label='Voltar'
            icon='pi pi-arrow-left'
            onClick={() => {
              navigate('/departamentos')
            }}
          />
        </>
      }

      <div className={erroCritico != '' ? 'hidden' : ''}>
        <div className='flex mt-12'>

          <div className="p-float-label w-1/2 pr-2">
            <InputText 
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)} 
              className={`w-full  !shadow-none  ${erroNome ? 'p-invalid' : ''}`}
              autoComplete='off'
              ref={nomeInputRef}
            />
            <label htmlFor="nome">Nome</label>
          </div>

          <div className="p-float-label w-1/4">
            <InputText 
              id="sigla"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
              className={`w-full !shadow-none ${erroSigla ? 'p-invalid' : ''}`}
              autoComplete='off'
              ref={siglaInputRef}
            />
            <label htmlFor="sigla">Sigla</label>
          </div>

        </div>

        <div className='flex mt-6'>
          <Button
            type='submit'
            label={id_departamento ? 'Atualizar' : 'Cadastrar' }
            severity='info'
            icon='pi pi-check'
            className='!mr-4'
            onClick={() => {
              if(formValidate()) {
                saveDepartamento()
              }
            }}
          />

          {erro !== '' &&
          <Message
            severity='error'
            text={erro}
          />
          }
        </div>
    
      </div>
    </>
  )
}

export default FormDepartamentos