<?php

namespace App\Models;

use App\Models\Annonce;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory;
    protected $fillable = ['url', 'annonce_id'];

    public function annonce(): BelongsTo
    {
        return $this->BelongsTo(Annonce::class, 'annonce_id');
    }
}
