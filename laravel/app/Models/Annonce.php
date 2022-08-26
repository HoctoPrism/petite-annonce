<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Annonce extends Model
{
    use HasFactory;
    protected $fillable = ['name_annonce', 'description', 'price', 'contenance', 'volume', 'package_id', 'brand_id', 'category_id', 'user_id'];

    public function package(): BelongsTo
    {
        return $this->BelongsTo(Package::class, 'package_id');
    }

    public function brand(): BelongsTo
    {
        return $this->BelongsTo(Brand::class, 'brand_id');
    }

    public function category(): BelongsTo
    {
        return $this->BelongsTo(Category::class, 'category_id');
    }

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class, 'user_id');
    }
}
