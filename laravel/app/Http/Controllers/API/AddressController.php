<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $addresses = Address::with(['user'])->get();
        $addresses->map(function ($address){
            unset($address['user_id']);
        });
        return response()->json([
            'status' => 'Success',
            'data' => $addresses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required|max:100',
            'postal_code' => 'required|max:100',
            'city' => 'required|max:100',
            'country' => 'required|max:100',
            'phone' => 'required|max:100',
        ]);
        // On crée une nouvelle adresse
        $address = Address::create([
            'address' => $request->address,
            'postal_code' => $request->postal_code,
            'city' => $request->city,
            'country' => $request->country,
            'phone' => $request->phone,
            'user_id' => $request->user_id,

        ]);
        $address->user = $address->user()->get()[0];

        // On retourne les informations du nouvel utilisateur en JSON
        return response()->json([
            'status' => 'Success',
            'data' => $address,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function show(Address $address)
    {
        $address->load(['user']);
        unset($address->user_id);
        return response()->json($address);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        $this->validate($request, [
            'address' => 'required|max:100',
            'postal_code' => 'required|max:100',
            'city' => 'required|max:100',
            'country' => 'required|max:100',
            'phone' => 'required|max:100',
        ]);
        // On crée un nouvel utilisateur
        $address->update([
            'address' => $request->address,
            'postal_code' => $request->postal_code,
            'city' => $request->city,
            'country' => $request->country,
            'phone' => $request->phone,
            'user_id' => $request->user_id,
        ]);
        // On retourne les informations du nouvel utilisateur en JSON
        $address->user = $address->user()->get()[0];

        return response()->json([
            'status' => 'Success',
            'data' => $address
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        // On supprime l'utilisateur
        $address->delete();
        // On retourne la réponse JSON
        return response()->json([
            'status' => 'Supprimer avec succès avec succèss'
        ]);
    }
}
