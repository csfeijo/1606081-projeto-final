import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import logo from '../../assets/img/logo-tt.svg'

const Menu = () => {

  const navigate = useNavigate()

  const menuItems = [
    {
      label: 'Departamentos',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Listar',
          icon: 'pi pi-list',
          command: () => {
            navigate('/departamentos')
          }
        },
        {
          separator: true
        },
        {
          label: 'Adicionar',
          icon: 'pi pi-plus',
          command: () => {
            navigate('/departamentos/new')
          }
        }
      ]
    },
  ]

  const start = () => (
    <Link to='/'>
      <img src={logo} className='w-6 mr-4'/>
    </Link>
  )

  return (
    <Menubar model={menuItems} start={start}/>
  )
}

export default Menu