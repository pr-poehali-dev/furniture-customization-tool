import os
import json
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправляет заявку на рассрочку из всплывающего окна в Telegram"""

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

    text = (
        f'💳 <b>Заявка на рассрочку 0-0-24</b>\n\n'
        f'👤 <b>Имя:</b> {name}\n'
        f'📞 <b>Телефон:</b> {phone}\n'
        f'\n📌 Источник: всплывающий баннер'
    )

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
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': result.get('ok', False)})
    }
