export interface LoginRequest {
    email:string,
    password:string
}

export interface SignupRequest {
    email:string,
    username:string,
    first_name:string,
    last_name:string,
    password:string,
    is_staff: string
}