<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class MailSettingsController extends Controller
{
       public function update(Request $request)
    {
        $envPath = base_path('.env');
        if (!File::exists($envPath)) {
            return response()->json(['message' => '.env file not found'], 404);
        }

        $data = [
            'MAIL_MAILER' => $request->mail_mailer,
            'MAIL_HOST' => $request->mail_host,
            'MAIL_PORT' => $request->mail_port,
            'MAIL_USERNAME' => $request->mail_username,
            'MAIL_PASSWORD' => $request->mail_password,
            'MAIL_ENCRYPTION' => $request->mail_encryption,
        ];

        foreach ($data as $key => $value) {
            self::setEnvValue($key, $value);
        }

        return response()->json(['message' => 'Mail settings updated']);
    }

    public static function setEnvValue($key, $value)
    {
        $envPath = base_path('.env');
        $escaped = preg_quote("{$key}=", '/');
        $content = file_get_contents($envPath);

        if (preg_match("/^{$escaped}.*/m", $content)) {
            $content = preg_replace("/^{$escaped}.*/m", "{$key}=\"{$value}\"", $content);
        } else {
            $content .= "\n{$key}=\"{$value}\"";
        }

        file_put_contents($envPath, $content);
    }
}
