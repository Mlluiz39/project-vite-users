import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '@/api'

import * as S from './styles'

import Trash from '@/assets/trash.svg'
import Arrow from '@/assets/arrow.svg'

export default function Users() {
  const [users, setUsers] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function loadUsers() {
      const { data: newUsers } = await api
        .get('/users')

        .catch(function (error) {
          console.log(JSON.stringify(error))
        })
      setUsers(newUsers)
    }
    loadUsers()
  }, [])

  async function deleteUser(userId) {
    await api.delete(`/users/${userId}`)
    setUsers(users.filter(user => user.id !== userId))
  }

  function goBackPage() {
    history.push('/')
  }

  return (
    <S.Container>
      <S.H1>Lista de usuários</S.H1>
      <S.Table>
        <S.TableHeader>
          <S.TRHeader>
            <S.THHeader>ID</S.THHeader>
            <S.THHeader>Nome</S.THHeader>
            <S.THHeader>Email</S.THHeader>
          </S.TRHeader>
        </S.TableHeader>
        {users.map(user => (
          <S.TableBody key={user.id}>
            <S.TRow>
              <S.TData>{user.id}</S.TData>
              <S.TData>{user.name}</S.TData>
              <S.TData>
                {user.email}
                <S.Image
                  onClick={() => deleteUser(user.id)}
                  alt="seta"
                  src={Trash}
                />
              </S.TData>
            </S.TRow>
          </S.TableBody>
        ))}
      </S.Table>
      <S.Button onClick={goBackPage}>
        <img alt="seta" src={Arrow} /> voltar
      </S.Button>
    </S.Container>
  )
}
