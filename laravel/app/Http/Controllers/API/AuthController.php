<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',

        ],
        [
            'email.email' => 'Ce champ attend un donnée de type email',
            'email.required' => 'Ce champ est requis',
            'password.required' => 'Ce champ est requis',
            'password.string' => 'Ce champ attend un donnée de type text'
        ]
    );
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
                'status' => 'success',
                'user' => $user,
                'token' => $token,
            ]);

    }

    public function register(Request $request){

        $request->validate([
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ],
        [
            'lastname.required' => 'Ce champ est requis',
            'lastname.string' => 'Ce champ attend un donnée de type text',
            'firstname.required' => 'Ce champ est requis',
            'firstname.string' => 'Ce champ attend un donnée de type text',
            'username.required' => 'Ce champ est requis',
            'username.string' => 'Ce champ attend un donnée de type text',
            'email.email' => 'Ce champ attend un donnée de type email',
            'email.required' => 'Ce champ est requis',
            'email.unique' => 'Ce mail est déja utilisé',
            'password.required' => 'Ce champ est requis',
            'password.string' => 'Ce champ attend un donnée de type text'
        ]
    );

        if (empty($request->roles)){
            $request->roles = json_encode(["ROLE_USER"]);
        } else {
            json_encode($request->roles);
        }

        $user = User::create([
            'lastname' => $request->lastname,
            'firstname' => $request->firstname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'roles' => $request->roles,
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
            'request' => $request
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

        public function currentUser()
        {
            return response()->json(Auth::user());
        }

}
