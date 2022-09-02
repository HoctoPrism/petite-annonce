<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Denomination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DenominationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() : JsonResponse
    {
        $denominations = Denomination::with(['category'])->get();
        $denominations->map(function ($denomination){
            unset($denomination['category_id']);
        });

        return response()->json(['status' => 'Success', 'data' => $denominations]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_denomination' => 'required|max:100',
        ]);
        $denomination = Denomination::create([
            'name_denomination' => $request->name_denomination,
            'category_id' => $request->category_id,
        ]);
        $denomination->category = $denomination->category()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $denomination]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Denomination  $denomination
     * @return Response
     */
    public function show(Denomination $denomination)
    {
        $denomination->load(['category']);
        unset($denomination->category_id);
        return response()->json($denomination);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Denomination  $denomination
     * @return Response
     */
    public function update(Request $request, Denomination $denomination)
    {
        $this->validate($request, [
            'name_denomination' => 'required|max:100',

        ]);
        $denomination->update([
            'name_denomination' => $request->name_denomination,
            'category_id' => $request->category_id,
        ]);
        $denomination->category = $denomination->category()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $denomination]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Denomination  $denomination
     * @return Response
     */
    public function destroy(Denomination $denomination)
    {
        $denomination->delete();
        return response()->json(['status' => 'Supprimer avec succès']);
    }
}
