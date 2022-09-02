<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $annonces= Annonce::with(['user' , 'package', 'brand' , 'category'])->get();
        $annonces->map(function ($annonce){
            unset($annonce['user_id']);
            $annonce['package_id'] = $annonce['package'];
            unset($annonce['package']);
            unset($annonce['brand_id']);
            unset($annonce['category_id']);
        });

        return response()->json([
            'status' => 'Success',
            'data' => $annonces
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_annonce' => 'required|max:200',
            'description' => 'required|max:2000',
            'price' => 'required',
            'package_id' => 'required',
            'brand_id' => 'required',
            'category_id' => 'required',
            'user_id' => 'required',
        ]);
        $annonce = Annonce::create([
            'name_annonce' => $request->name_annonce,
            'description' => $request->description,
            'price' => $request->price,
            'contenance' => $request->contenance,
            'volume' => $request->volume,
            'package_id' => $request->package_id,
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
        ]);

        $annonce->brand = $annonce->brand()->get()[0];
        $annonce->category = $annonce->category()->get()[0];
        $annonce->user = $annonce->user()->get()[0];
        $annonce->package_id = $annonce->package()->get()[0];

        return response()->json([
            'status' => 'Success',
            'data' => $annonce,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Annonce $annonce
     * @return JsonResponse
     */
    public function show(Annonce $annonce)
    {
        $annonce->load(['user']);
        $annonce->load(['package']);
        $annonce->load(['category']);
        $annonce->load(['brand']);
        unset($annonce->user_id);
        unset($annonce->package_id);
        unset($annonce->category_id);
        unset($annonce->brand_id);
        return response()->json($annonce);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Annonce $annonce
     * @return JsonResponse
     */
    public function update(Request $request, Annonce $annonce)
    {
        $this->validate($request, [
            'name_annonce' => 'required|max:200',
            'description' => 'required|max:2000',
            'price' => 'required',
            'package_id' => 'required',
            'brand_id' => 'required',
            'category_id' => 'required',
            'user_id' => 'required',
        ]);
        $annonce->update([
            'name_annonce' => $request->name_annonce,
            'description' => $request->description,
            'price' => $request->price,
            'contenance' => $request->contenance,
            'volume' => $request->volume,
            'package_id' => $request->package_id,
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
        ]);

        $annonce->brand = $annonce->brand()->get()[0];
        $annonce->category = $annonce->category()->get()[0];
        $annonce->user = $annonce->user()->get()[0];
        $annonce->package_id = $annonce->package()->get()[0];

        return response()->json([
            'status' => 'Mise à jour avec succèss',
            'data' => $annonce
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Annonce $annonce
     * @return JsonResponse
     */
    public function destroy(Annonce $annonce)
    {
        $annonce->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
