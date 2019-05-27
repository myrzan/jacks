<?
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$name = preg_replace("/[^A-Za-zА-Яа-я-]/u", "", $_POST['name']);
	$phone = preg_replace("/[^0-9-()+]/u", "", $_POST['phone']);
	$email = addslashes($_POST['email']);
	$message = addslashes($_POST['message']);
	file_put_contents('contact.log', date("Y-m-d H:i:s") . " - " . $name . ", " . $phone . ", " . $email . "\n" . $message .  "\n\n", FILE_APPEND);
	echo json_encode(['success' => 1, 'message' => 'Ваша заявка зарегистрирована. Скоро наш менеджер вам позвонит.']);
}