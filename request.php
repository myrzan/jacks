<?
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$name = preg_replace("/[^A-Za-zА-Яа-я-]/u", "", $_POST['name']);
	$phone = preg_replace("/[^0-9-()+]/u", "", $_POST['phone']);
	file_put_contents('request.log', date("Y-m-d H:i:s") . " - " . $name . " " . $phone . "\n", FILE_APPEND);
	echo json_encode(['success' => 1, 'message' => 'Ваша заявка зарегистрирована.<br>Скоро наш менеджер вам позвонит.']);
}