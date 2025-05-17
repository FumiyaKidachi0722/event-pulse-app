# api/get_stock.py
import os
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import yfinance as yf

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # クエリパラメータ解析
        query = parse_qs(urlparse(self.path).query)
        ticker = query.get('ticker', [''])[0].upper()
        if not ticker:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'ticker パラメータを指定してください'}).encode())
            return

        try:
            # yfinance で株価取得
            tk = yf.Ticker(ticker)
            hist = tk.history(period='1d')  # 当日データ
            data = {
                'ticker': ticker,
                'close': hist['Close'].iloc[-1],
                'volume': int(hist['Volume'].iloc[-1]),
                'timestamp': str(hist.index[-1]),
            }
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
