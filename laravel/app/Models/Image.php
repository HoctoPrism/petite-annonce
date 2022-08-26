<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory;
    protected $fillable = ['url', 'annonce_id'];

    public function annonces(): BelongsTo
    {
        return $this->BelongsTo(Annonce::class, 'annonce_id');
    }
}
