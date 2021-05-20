<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHtml(true);

    $mail->setFrom('dmitry9989@gmail.com', 'dimas');
    $mail->addAddress('dmitry9989@gmail.com');
    $mail->Subject = 'Заказ';

    $body = '<h1>Заказ:</h1>';
    
    $body.= '<h2>Данные заказчика:</h2>' ;

    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].' </p>';
    }

    if(trim(!empty($_POST['adress']))) {
        $body.='<p><strong>Адрес:</strong> '.$_POST['adress'].' </p>';
    }

    if(trim(!empty($_POST['district']))) {
        $body.='<p><strong>Район:</strong> '.$_POST['district'].' </p>';
    }

    if(trim(!empty($_POST['phone']))) {
        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].' </p>';
    }

    if(trim(!empty($_POST['pay']))) {
        $body.='<p><strong>Оплата:</strong> '.$_POST['pay'].' </p>';
    }

    if(trim(!empty($_POST['message']))) {
		$body.='<p><strong>Комментарий:</strong> '.$_POST['message'].' </p>';
    }

    if(trim(!empty($_POST['when-pick']))) {
        $body.='<p><strong>Когда заберет:</strong> '.$_POST['when-pick'].' </p>';
    }

    if(trim(!empty($_POST['price']))) {
        $body.='<p><strong>Общая сумма заказа:</strong> '.$_POST['price'].' </p>';
    }

    if(trim(!empty($_POST['support']))) {
        $body.='<p><strong>Сообщение в поддержку:</strong> '.$_POST['price'].' </p>';
    }

    $decoded_json = json_decode($_POST['products'], true);
    

    $body.= '<h2>Товары:</h2>' ;
    
    foreach($decoded_json as $item) {
        $body.='<p><strong>Айди: </strong>'.$item['id'].'<strong>; Наименование: </strong>' .$item['name']. '<strong>; Количество: </strong>'.$item['count'].'</p>';
    }    

        if(!empty($_FILES['image']['tmp_name'])) {
            $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
            if (copy($_FILES['image']['tmp_name'], $filePath)) {
                $fileAttach = $filePath;
                $body.='<p><strong>Фото в приложении</strong>';
                $mail->addAttachment($fileAttach);
            }
        }


		$mail->Body = $body;
    /////////////////////// отправляем

    if (!$mail->send()) {
        $message = 'Произошла ошибка, попробуйте еще раз';
    } else {
        $message = 'Заявка успешно отправлена';
    }

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
    
