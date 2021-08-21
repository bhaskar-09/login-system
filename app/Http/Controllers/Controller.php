<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use BenMajor\ImageResize\Image;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function convertSize($size = 0)
    {
        $base = log($size) / log(1024);
        $suffix = array("", "KB", "MB", "GB", "TB");
        $f_base = floor($base);
        return round(pow(1024, $base - floor($base)), 1) . $suffix[$f_base];
    }

    public function dateFormat($date)
    {
        $date = date_create($date);
        return date_format($date, "dS F, Y");
    }
    public function createRandomId($wordcount = 6)
    {
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ023456789";
        srand((float) microtime() * 1000000);
        $i = 0;
        $pass = '';

        while ($i <= $wordcount) {
            $num = rand() % 33;
            $tmp = substr($chars, $num, 1);
            $pass = $pass . $tmp;
            $i++;
        }

        return $pass;
    }
    public function imagesInfo($imgfilename = '')
    {
        $size = getimagesize($imgfilename);
        $stat = stat($imgfilename);

        $info = [
            'size' => $stat['size'],
            'csize' => $this->convertSize($stat['size']),
            'dimension' => $size[0].'X'.$size[1],
            'height' => $size[1],
            'width' => $size[0],
            'type' => $size['mime'],
        ];
        return $info;
    }
    public function imageResize($file, $height, $path) {
        $image = new Image($file);
        $image->resizeHeight( $height );
        $image->output($path);
        return true;
    }
}
