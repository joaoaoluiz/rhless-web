import React from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import ButtonSecondary from 'components/Button/Variants/ButtonSecondary'
import logo from 'assets/logo.jpg'
import Input from 'components/Input/Input'
import paths from 'router/paths'
import Link from 'components/Link/Link'

function Login() {
  return (
    <form
      className='flex flex-col items-center justify-center h-full gap-4 grow'
    >
      <img
        src={logo}
      />
      <div className='flex flex-col items-center w-full max-w-sm gap-4'>
        <Input className='w-full' placeholder='Informe seu email' />
        <Input className='w-full' placeholder='Informe sua senha' />
        <ButtonPrimary className='w-full p-3'>
          Entrar
        </ButtonPrimary>
        <ButtonSecondary className='w-full p-3'>
          Solicitar Cadastro
        </ButtonSecondary>

      </div>
      <Link to={paths.unauth.restorePassword}>
        Esqueceu a senha?
      </Link>
    </form>
  )
}

export default Login