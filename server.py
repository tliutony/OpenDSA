#!/usr/bin/env python3

import sys
import argparse
from http.server import SimpleHTTPRequestHandler, HTTPServer
from socket import gethostname, getfqdn, gethostbyname
from collections import Counter

def makeSimpleServer(port=8000, bind=""):
    server_address = (bind, port)
    HandlerClass = SimpleHTTPRequestHandler
    HandlerClass.protocol_version = "HTTP/1.0"
    with HTTPServer(server_address, HandlerClass) as httpd:
        host, port = httpd.socket.getsockname()
        if host == "0.0.0.0":
            hosts = ["localhost", "127.0.0.1", gethostname(), getfqdn(), gethostbyname(gethostname())]
            print("Server now live at these addresses:")
            for realHost in Counter(hosts):
                print("    http://{0}:{1}/".format(realHost, port))
        else:
            print("Server now live at http://{0}:{1}/".format(host, port))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received, exiting.")
            sys.exit(0)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('port', default=8000, type=int, nargs='?',
                        help='Specify alternate port [default: 8000]')
    parser.add_argument('--bind', '-b', default='', metavar='ADDRESS',
                        help='Specify alternate bind address [default: all interfaces]')
    args = parser.parse_args()
    makeSimpleServer(port=args.port, bind=args.bind)
