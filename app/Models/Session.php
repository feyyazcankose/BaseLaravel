<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    public $timestamps = false; // Otomatik zaman damgalarını devre dışı bırakır

    protected $fillable = [
        'ip_address',
        'user_agent',
        'last_activity',
        'token',
        'admin_id',
        'user_id',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
