# SpringAI

> [Spring AI 알아보기](https://docs.spring.io/spring-ai/reference/1.0/api/chat/ollama-chat.html)

> [MARIADB 알아보기](https://mariadb.org/)

> [OLLAMA 알아보기](https://ollama.com)

- [LLAMA3.2 알아보기](https://ollama.com/library/llama3.2)

- [LLAMA3.2-VISION 알아보기](https://ollama.com/library/llama3.2-vision)

---

> [DOCKER 알아보기](https://docs.docker.com/?_gl=1*naramj*_gcl_au*MTQ2NzkxNjE1Ny4xNzM4ODg1NDk4*_ga*NTg3NjA3NTUzLjE3Mzg4ODU0OTg.*_ga_XJWPQMJYHQ*MTczODg4NTQ5OC4xLjEuMTczODg4NTQ5OC42MC4wLjA.)

- [OLLAMA IMAGE 알아보기](https://hub.docker.com/r/ollama/ollama)

- [MARIADB IMAGE 알아보기](https://hub.docker.com/_/mariadb)

- [OPENJDK IMAGE 알아보기](https://hub.docker.com/_/openjdk)

## DOCKER COMPOSE

- OLLAMA SETTING
```yml
ollama:
    container_name: ollama
    image: ollama/ollama:latest
    restart: always
    ports:
        - 21434:11434
    volumes:
        - ./ollama_data:/root/.ollama:rw
    environment:
        - OLLAMA_HOST=0.0.0.0
        - TZ=Asia/Seoul
        - LC_ALL:en_US.UTF-8
    networks:
        myNet:
        ipv4_address: 192.168.100.10
```

- MARIADB SETTING
```yml
db:
    container_name: db
    image: mariadb:11.6.2
    restart: always
    ports: 
      - 13306:3306
    volumes:
        - ./mariadb/conf.d:/etc/mysql/conf.d:ro
        - ./mariadb/data:/var/lib/mysql:rw
        - ./mariadb/initdb.d:/docker-entrypoint-initdb.d:ro
    environment:
      - MYSQL_HOST=localhost
      - MYSQL_PORT=3306
      - MYSQL_ROOT_PASSWORD=1234
      - MYSQL_DATABASE=ai
      - TZ=Asia/Seoul
      - LC_ALL:en_US.UTF-8
    networks:
      myNet:
        ipv4_address: 192.168.100.20
```

- SPRING BOOT SETTING
```yml
backend:
    container_name: backend
    image: openjdk:21-jdk
    restart: always
    depends_on:
      - db
      - ollama
    links:
      - db
      - ollama
    ports:
      - 8080:8080
    volumes:
      - ./app:/usr/local/app:ro
    environment:
      - DB_DRIVER=org.mariadb.jdbc.Driver
      - DB_URL=jdbc:mariadb://db:3306/ai
      - DB_USERNAME=root
      - DB_PASSWORD=1234
      - SESSION_TIMEOUT=60m
      - AI_HOST=http://ollama:11434/
      - AI_MODEL=llama3.2:3b
      - TZ=Asia/Seoul
      - LC_ALL:en_US.UTF-8
    networks:
      myNet:
        ipv4_address: 192.168.100.30
    command: java -XX:UseSVE=0 -jar /usr/local/app/ai-1.jar
```

- DOCKER NETWORK SETTING
```yml
networks:
  myNet:
    driver: bridge
    ipam:
      config:
        - subnet: 192.168.100.0/24
          gateway: 192.168.100.254
```

## OLLAMA MODEL PULL

- llama3.2
```cmd
ollama pull llama3.2:3b
```

- llama3.2-vision 
```cmd
ollama pull llama3.2-vision:11b
```

## SPRING APPLICATION SETTING

- `application.yml` 중 ENV 가져오기
```yml
config:
    import: optional:file:env[.properties]
```

- MARIADB CONNECTION INFO
```yml
DB_DRIVER=org.mariadb.jdbc.Driver
DB_URL=jdbc:mariadb://db:3306/ai
DB_USERNAME=root
DB_PASSWORD=1234
```

- OLLAMA CONNECTION INFO
```yml
AI_HOST=http://ollama:11434/
AI_MODEL=llama3.2:3b
```

- SERVLET SESSION INFO
```yml
SESSION_TIMEOUT=60m
```
