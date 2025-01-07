---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `JASMINE__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `JASMINE__SERVER__PORT` -
  port to run the server on
  (default: `10620`)
- `JASMINE__SECRETS__AUTH` -
  secrets for encrypting auth cookies
  (default: `secret`)
- `JASMINE__URLS__PUBLIC` -
  public URL of the app
  (default: `http://localhost:10620`)
- `JASMINE__BEAVER__HTTP__SCHEME`
  scheme of the HTTP API of the beaver service
  (default: `http`)
- `JASMINE__BEAVER__HTTP__HOST`
  host of the HTTP API of the beaver service
  (default: `localhost`)
- `JASMINE__BEAVER__HTTP__PORT`
  port of the HTTP API of the beaver service
  (default: `10500`)
- `JASMINE__BEAVER__HTTP__PATH`
  path of the HTTP API of the beaver service
  (default: ``)
- `JASMINE__NUMBAT__HTTP__SCHEME`
  scheme of the HTTP API of the numbat service
  (default: `http`)
- `JASMINE__NUMBAT__HTTP__HOST`
  host of the HTTP API of the numbat service
  (default: `localhost`)
- `JASMINE__NUMBAT__HTTP__PORT`
  port of the HTTP API of the numbat service
  (default: `10600`)
- `JASMINE__NUMBAT__HTTP__PATH`
  path of the HTTP API of the numbat service
  (default: ``)
- `JASMINE__SCORPION__PUBLIC__SCHEME` -
  scheme of the public API of the scorpion service
  (default: `http`)
- `JASMINE__SCORPION__PUBLIC__HOST` -
  host of the public API of the scorpion service
  (default: `localhost`)
- `JASMINE__SCORPION__PUBLIC__PORT` -
  port of the public API of the scorpion service
  (default: `20000`)
- `JASMINE__SCORPION__PUBLIC__PATH` -
  path of the public API of the scorpion service
  (default: ``)
- `JASMINE__SCORPION__PUBLIC__CLIENT` -
  client ID to authenticate with the public API of the scorpion service
  (default: `jasmine`)
- `JASMINE__SCORPION__PUBLIC__SECRET` -
  client secret to authenticate with the public API of the scorpion service
  (default: `secret`)
- `JASMINE__DEBUG` -
  enable debug mode
  (default: `true`)
