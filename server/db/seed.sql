INSERT INTO notifications(
  environment,
  message,
  user_agent,
  stack_trace,
  resolved,
  updated_at,
  created_at
  )
VALUES(
  'development',
  'test_message_1',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31',
  '["foo", "bar"]',
  'f',
  now(),
  now()
)
