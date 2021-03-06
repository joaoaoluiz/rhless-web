import React, { useState } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import ButtonSecondary from 'components/Button/Variants/ButtonSecondary'
import logo from 'assets/logo.jpg'
import Input from 'components/Input/Input'
import paths from 'router/paths'
import Link from 'components/Link/Link'
import { useForm } from 'react-hook-form'
import { ILoginForm } from 'views/Login/type'
import { useNavigate } from 'react-router-dom'
import RequestAccount from 'components/RequestAccountModal/RequestAccountModal'
import { useModalContext } from 'hooks/useModalContext'
import useDialogContext from 'hooks/useDialogContext'
import UserRepository from 'Repository/users'
import useUser from 'hooks/useUser'
import RestorePassword from 'components/RestorePassword/RestorePassword'

function UserLogin () {
  const { handleSubmit, register } = useForm<ILoginForm>()
  const navigate = useNavigate()
  const [showRequestAccountModal, setShowRequestAccountModal] = useState(false)
  const { updateShowModal } = useModalContext()
  const { saveSession } = useUser()
  const { dialog } = useDialogContext()

  async function onSubmit (values: ILoginForm) {
    try {
      const response = await UserRepository.login(values)
      const { token, user } = response.data

      saveSession({ token, user })

      const initialPath = user.type === 'candidate'
        ? paths.unauth.feed
        : `/auth${paths.auth.home}`

      navigate(initialPath)
    } catch (e) {
      if (typeof e === 'string') dialog({ content: String(e) })
      console.log(e)
    }
  }

  const { ref: emailRef, ...emailRegister } = register('email')
  const { ref: passwordRef, ...passwordRegister } = register('password')

  function updateShowRequestAccountModal (value: boolean) {
    updateShowModal(value)
    setShowRequestAccountModal(value)
  }

  return (
    <div className='flex flex-col h-full '>
      {showRequestAccountModal && (
        <RequestAccount
          onCancelForm={() => updateShowRequestAccountModal(false)}
          onSubmitForm={() => updateShowRequestAccountModal(false)}
        />
      )}
      <form
        className='flex flex-col items-center justify-center gap-4 grow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          src={logo}
        />
        <div className='flex flex-col items-center w-full max-w-sm gap-4 p-5'>
          <Input
            className='w-full'
            placeholder='Informe seu email'
            forwardedRef={emailRef}
            {...emailRegister}
          />
          <Input
            className='w-full'
            placeholder='Informe sua senha'
            forwardedRef={passwordRef}
            type='password'
            {...passwordRegister}
          />
          <ButtonPrimary
            className='w-full p-3'
            type='submit'
          >
            Entrar
          </ButtonPrimary>
          <ButtonSecondary
            type='button'
            className='w-full p-3'
            onClick={() => updateShowRequestAccountModal(true)}
            onKeyDown={(e) => e.key === 'Enter' && updateShowRequestAccountModal(true)}
          >
            Solicitar Cadastro
          </ButtonSecondary>
        </div>
        <RestorePassword />
      </form>
      <Link
        className='m-5 ml-auto font-semibold text-secondary'
        to={paths.unauth.userLogin}
      >
        Entrar como candidato
      </Link>
    </div>
  )
}

export default UserLogin
