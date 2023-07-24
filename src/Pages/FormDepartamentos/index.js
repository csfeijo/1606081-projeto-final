import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'

const FormDepartamentos = () => {
  // Configura os states
  const [nome, setNome] = useState('')
  const [erroNome, setErroNome] = useState(false)
  const [sigla, setSigla] = useState('')
  const [erroSigla, setErroSigla] = useState(false)

  const [erro, setErro] = useState('')
  
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

  return (
    <>     
      <h1 className='text-xl my-6'>
        <i className='pi pi-plus mr-4'/>
        Cadastro de Departamentos
      </h1>
    
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
          label='Save'
          severity='info'
          icon='pi pi-check'
          className='!mr-4'
          onClick={() => {
            formValidate()
          }}
        />

        {erro !== '' &&
          <Message
            severity='error'
            text={erro}
          />
        }
      </div>
    
    
    </>
  )
}

export default FormDepartamentos