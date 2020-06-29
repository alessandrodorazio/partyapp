<?php

namespace App\Http;

class Responser
{
    public $response, $status;

    public function response()
    {
        if (!isset($this->response['showMessage'])) {
            $this->response['showMessage'] = false;
        }
        if (!isset($this->response['success'])) {
            $this->response['success'] = false;
        }

        if($this->status) {
            return response()->json($this->response, $this->status);
        }

        if ($this->response['success'] === false) {
            return response()->json($this->response, 422);
        } else {
            return response()->json($this->response, 200);
        }

        return response()->json($this->response);
    }

    public function success()
    {
        $this->response['success'] = true;
        return $this;
    }
    public function failed()
    {
        $this->response['success'] = false;
        return $this;
    }

    public function message($message)
    {
        $this->response['message'] = $message;
        return $this;
    }
    public function showMessage()
    {
        $this->response['showMessage'] = true;
        return $this;
    }
    public function notShowMessage()
    {
        $this->response['showMessage'] = false;
        return $this;
    }

    public function item($item_name, $item)
    {
        $this->response[$item_name] = $item;
        return $this;
    }

    public function statusCode($status) {
        $this->status = $status;
        return $this;
    }
}
