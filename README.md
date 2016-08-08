# atom-package-top
Popular Atom packages list views and data crawler.

## Spider

### entry

```
babel-node spider/main.js
```

### data

```
/data/
  |- {today}
      |-raw
        |-{sortType} x n
            |- {pageNo}.html x m
      |-parsed
        | ...same as raw
```

### cache

A compound key that consists `date`(YYYYMMDD) and full `url`

### log

simple once log in `.log/log.txt`



## TODO

- [ ] * task model with complete flag which used to restore
- [ ] * webpack (specially dev mode)
- [ ] unit test
- [ ] ci
- [ ] make ordered appendFile npm pkg
- [ ] make spider pkg
- [ ] ** list view
