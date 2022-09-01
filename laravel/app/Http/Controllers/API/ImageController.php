<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $images = Image::with(['annonce'])->get();
        $images->map(function ($image){
            unset($image['annonce_id']);
        });
        return response()->json([
            'status' => 'Success',
            'data' => $images
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
            'url' => 'image|required|max: 1999',
             'annonce_id' => 'required'
        ]);

        if ($request->hasFile('url')) {
            $filename = $this->getFilename($request);
        } else {
            $filename = Null;
        }

        $image = Image::create([
            'url' => $filename,
            'annonce_id' => $request->annonce_id
        ]);

        $image->annonce = $image->annonce()->get()[0];

        return response()->json([
            'status' => 'Success',
            'data' => $image,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Image $image
     * @return JsonResponse
     */
    public function show(Image $image): JsonResponse
    {
        $image->load(['annonce']);
        unset($image->annonce_id);
        return response()->json($image);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Image $image
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Image $image): JsonResponse
    {
        $this->validate($request, [
            'url' => 'image|required|max: 4000',
            'annonce_id' => 'required'
        ]);

        if ($request->hasFile('url')) {
            if (Image::findOrFail($image->id)->url){
                Storage::delete("/public/uploads/".Image::findOrFail($image->id)->url);
            }
            $filename = $this->getFilename($request);
            $request->url = $filename;
        }

        if ($request->url == null){
            $request->url = Image::findOrFail($image->id)->url;
        }

        $image->update([
            'url' => $request->url,
            'annonce_id' => $request->annonce_id
        ]);

        $image->annonce = $image->annonce()->get()[0];

        return response()->json([
            'status' => 'Mise à jour avec success',
            'data' => $image,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Image $image
     * @return JsonResponse
     */
    public function destroy(Image $image): JsonResponse
    {
        if ($image->url){
            Storage::delete("/public/uploads/".$image->url);
        }
        $image->delete();

        return response()->json([
            'status' => 'Supprimer avec success'
        ]);
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getFilename(Request $request): string
    {
        $filenameWithExt = $request->file('url')->getClientOriginalName();
        $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $extension = $request->file('url')->getClientOriginalExtension();
        $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
        $path = $request->file('url')->storeAs('public/uploads', $filename);
        return $filename;
    }
}
