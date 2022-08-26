<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denomination extends Model
{
    use HasFactory;
    protected $fillable = ['name_denomination'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
