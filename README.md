# bugzilla-node

A prototype REST API on top of the Bugzilla database. Built for use with [bugzilla-ember](https://github.com/ebryn/bugzilla-ember).

## Running

Should be as simple as `npm install` and then `node server.js`. The server will be accessible at http://0.0.0.0:8888.

## Database setup

A public dump of the Bugzilla database is available here: http://people.mozilla.com/~mhoye/bugzilla/

I had to customize my MySQL/MariaDB server config in order to import it:

```
[mysqld]

# from https://drupal.org/node/259580
key_buffer = 384M
max_allowed_packet = 64M
table_cache = 4096
sort_buffer_size = 2M
read_buffer_size = 2M
read_rnd_buffer_size = 64M
myisam_sort_buffer_size = 64M
thread_cache_size = 8
query_cache_size = 32M
innodb_buffer_pool_size = 384M
innodb_additional_mem_pool_size = 20M
innodb_log_file_size = 10M
innodb_log_buffer_size = 64M
innodb_flush_log_at_trx_commit = 1
innodb_lock_wait_timeout = 180
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ebryn/bugzilla-node/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
