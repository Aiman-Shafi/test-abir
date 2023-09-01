import axios, { AxiosResponse, AxiosError } from 'axios';
import { useAsyncError } from 'react-router-dom';
import auth0config from './auth0config.json';


export interface FundingRoundCreationRequest {
  companyId: string;
  displayName: string;
  fundingGoal: number;
  deadline: string;
}

export interface InvestmentCreationRequest {
  roundId: string;
  amount: number;
  shareCount: number;
}

export interface Company {
  companyId: string;
  name: string;
  logo: string;
  banner: string;
  bio: string;
  shortBio: string;
  partners: string[];
  industry: string[];
  website: string;
  valuation: number;
  minimumInvestment: number;
  sharePrice: number;
  sharesOutstanding: number;
  location: string;
  fundingRounds: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FundingRoundUpdateRequest {
  roundId: string;
  displayName?: string;
  fundingGoal?: number;
  deadline?: string;
}

export interface CompanyCreationRequest {
  name: string;
  logo: string;
  bio: string;
  partners: string[];
  industry: string[];
  website: string;
  valuation: number;
  minimumInvestment: number;
  sharePrice: number;
  sharesOutstanding: number;
  location: string;
}

export interface CompanyUpdateRequest {
  name?: string;
  logo?: string;
  bio?: string;
  partners?: string[];
  industry?: string[];
  website?: string;
  valuation?: number;
  minimumInvestment?: number;
  sharePrice?: number;
  sharesOutstanding?: number;
  location?: string;
}

export interface UserUpdateRequest {
  legalName?: string;
  bio?: string;
  email?: string;
  profilePic?: string;
  phoneNumber?: number;
  companies?: string[];
  connections?: string[];
  investments?: string[];
  banner?: string;
  education?: string;
  location?: string;
  occupation?: string;
  followers?: string[];
}

export interface User {
  userId: string;
  legalName: string;
  bio: string;
  email: string;
  secret: string;
  profilePic: string;
  banner: string;
  location: string;
  occupation: string;
  education: string;
  countryCode: string;
  phoneNumber: number;
  fundsBalance: number;
  companies: string[];
  connections: string[];
  followers: string[];
  investments: string[];
  visibility: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SignupResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface ConnectResponse {
  operation: string;
  success: boolean;
}


const API_BASE_URL = 'https://api.investloupt.com/';


//DONE
const apiRequest = async<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any

): Promise<T> => {
  try {
    //TODO: add stricter typing to response
    console.log("fetching " + endpoint + " ...")
    console.log("jwt:" + localStorage.getItem("jwt"))
    console.log("sub:" + localStorage.getItem('auth0Sub'))


    const response: AxiosResponse<T> = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'X-Auth0-Sub': `${localStorage.getItem('auth0Sub')}`
      }
    });
    return response.data;

  } catch (error) {
    const axiosError = error as AxiosError<T>;

    if (axiosError.response) {
      console.log("Axios Error: " + axiosError + method + endpoint + data)
      throw new Error(axiosError.message);
    } else {
      throw new Error('An error occurred during the API request.');
    }
  }
};


export const getUserToken = async (user: any, getAccessTokenSilently: Function) => {

  const domain = auth0config.domain;

  try {
    const accessToken = await getAccessTokenSilently({
      timeoutInSeconds: 5,
      authorizationParams: {
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      },
    });
    //console.log("Got user token from Auth0: " + accessToken);

    localStorage.setItem('jwt', accessToken)
    localStorage.setItem('auth0Sub', encodeURIComponent(user?.sub ?? ''));

    return ({ isAuthenticated: true })

  } catch (e) {
    console.log("error in getUserMetadata: ")
    if (e instanceof Error) {
      console.log(e.message);
    }
    return ({ isAuthenticated: false })
  }
};


//DONE
export const signupUser = async (legalName: string, email: string, phoneNumber: number, password: string) => {
  const response = await apiRequest<SignupResponse>('POST', 'signup', {
    legalName: legalName,
    email: email,
    phoneNumber: phoneNumber,
    pass: password,
  });
  return response;
}

//DONE
export const loginUser = async (email: string, password: string) => {
  const response = await apiRequest<LoginResponse>('POST', 'login', {
    email: email,
    pass: password,
  });
  return response;
}

//DONE
//if no user_id is passed, it will use the user_id stored in local storage (the logged in user)
export const getUser = async (user_id?: string) => {
  const userId = user_id || localStorage.getItem('userId')
  var url = 'user'
  if (userId && userId.length > 2) {
    url += '/' + userId
  }
  try {
    const response = await apiRequest<User>('GET', url)
    return response
  } catch (e) {
    console.log('error in getUser')
    console.log(e)
  }
}

//DONE
export const getConnectedUsers = async () => {
  const response = await apiRequest<User[]>('GET', 'users')
  return response
}

//DONE
export const getSuggestedUsers = async () => {
  const response = await apiRequest<User[]>('GET', 'users/suggested')
  return response
}

//DONE
export const updateUser = async (requestPayload: UserUpdateRequest) => {
  const response = await apiRequest<User>('PUT', `user`, requestPayload)
  return response
}

//DONE
export const addConnection = async (userId: string) => {
  const response = await apiRequest<ConnectResponse>('POST', `follow`, {
    userId: userId
  })
  return response
}

//DONE
export const getCompany = async (companyId: string) => {
  const response = await apiRequest<Company>('GET', `company/${companyId}`)
  return response
}

//DONE
export const getAllCompanies = async () => {
  const response = await apiRequest<Company[]>('GET', 'companies/all')
  return response
}

//DONE
export const getConnectedCompanies = async () => {
  const response = await apiRequest<Company[]>('GET', 'companies/connected')
  return response
}

//DONE
export const createCompany = async (requestPayload: CompanyCreationRequest): Promise<Company> => {
  const response = await apiRequest<Company>('POST', 'company', requestPayload);
  return response;
}

//DONE
export const updateCompany = async (companyId: string, requestPayload: CompanyUpdateRequest) => {
  const response = await apiRequest<Company>('PUT', `company/${companyId}`, requestPayload)
  return response
}

//DONE
export const createFundingRound = async (requestPayload: FundingRoundCreationRequest) => {
  const response = await apiRequest<Company>('POST', `fundinground`, requestPayload)
  return response
}

/*  CURRENTLY NOT FUNCTIONAL IN BACKEND
const getFundingRound = async(companyId: string, requestPayload: FundingRoundCreationRequest) => {
   */
const updateFundingRound = async (companyId: string, requestPayload: FundingRoundUpdateRequest) => {
  const response = await apiRequest<Company>('PUT', `fundinground/${companyId}`, requestPayload)
  return response
}

//incomplete, but funcitonal
//expects companyId in both the URL an the body of the request.
export const getFundingRound = async (companyId: string) => {
  const response = await apiRequest<{}>('GET', `fundinground/${companyId}`)
  return response
}

//non-functional
const makeInvestment = async (requestPayload: InvestmentCreationRequest) => {
  const response = await apiRequest<{}>('POST', `investment`, requestPayload)
  return response
}

