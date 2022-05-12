import { IRequest, IRequestPaginated, IRequestSearchable, IResponsePaginated } from 'Repository/type'

export type _userStatus = 'active' | 'inactive'

export type IUser = {
  _id: string
  name: string
  email: string
  status: _userStatus
  picture: string
}

export type IUsersListRequestParams = IRequestPaginated & IRequestSearchable

export type IUsersListRequest = IRequest<IUsersListRequestParams>

export type IUsersListResponse = IResponsePaginated<IUser>
