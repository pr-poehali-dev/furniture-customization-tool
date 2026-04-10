import os
import json
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправляет заявку из формы контактов в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    name = body.get('name', '—')
    phone = body.get('phone', '—')
    email = body.get('email', '—')
    message = body.get('message', '')

    text = (
        f'✉️ <b>Новое сообщение с сайта</b>\n\n'
        f'👤 <b>Имя:</b> {name}\n'
        f'📞 <b>Телефон:</b> {phone}\n'
        f'📧 <b>Email:</b> {email}\n'
    )

    if message:
        text += f'\n💬 <b>Сообщение:</b> {message}'

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
    }).encode()

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=data,
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': result.get('ok', False)})
    }