<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $packages = DB::table('packages')
            ->get()
            ->toArray();

        return response()->json([
            'status' => 'Success',
            'data' => $packages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $this->validate($request ,[
            'name_package' => 'required|max:100',
        ]);

        $package = Package::create([
            'name_package' => $request->name_package,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $package,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Package $package
     * @return JsonResponse
     */
    public function show(Package $package): JsonResponse
    {
        return response()->json($package);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Package $package
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Package $package): JsonResponse
    {
        $this->validate($request, [
            'name_package' => 'required|max:100'
        ]);

        $package->update([
            'name_package' => $request->name_package
        ]);

        return response()->json([
            'status' => 'Mise à jour avec success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Package $package
     * @return JsonResponse
     */
    public function destroy(Package $package): JsonResponse
    {
        $package->delete();

        return response()->json([
            'status' => 'Supprimer avec success'
        ]);
    }
}
