# Hello World Over HTTP

## A Literate Program in C99

### Prologue

For most of 2023 and 2024 I have been gainfully under-employed. That is, despite running a small business that nets around a thousand bucks a month, while also working on a small team, offering generous equity (but no funding), I continue to seek a _third_ gig where I have the privilege of contributing to society while earning a modest living.

One interesting fellow, presumably named Frank Stanley, put out this tempting call for [proposals][1] that included, in the application process, `a hello world program that doesn't use printf or iostreams`. I thought that was a pretty neat filter criterion, and a good exercise for me on its own merits. Yeah, that surprised me, too.

[1]: https://news.ycombinator.com/item?id=40846857

I first asked the internet, [here](https://www.perplexity.ai/search/write-a-basic-http-webserver-i-99XdilJ9S5WtmLxIFlDeCQ#0). I could have stopped there, because what it emitted worked just as intended with no modifications.

Instead, to prove I'm not an impostor, and in the hopes of supporting the next generation of low-level programmers, as [the old guard retires][2], I explain it in excruciating detail.

[2]: https://www.nextavenue.org/older-coders/

### Includes

The requirements state not to use `printf`, so I think `<stdio.h>` is fair game.

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <unistd.h>
    #include <arpa/inet.h>
    
### Constants

We'll run on port 48888, not 8080. By convention, HTTP runs on port 80 and HTTPS runs on port 443. Thus, by convention, local development servers will often run on port 8080. So as not to confuse this with one of those, I picked 48888 because it is easy to type and on the upper end of the [`uint16_t`](https://www.perplexity.ai/search/what-s-an-unsigned-16-bit-inte-PFMJBw1bT6qj0RkHHVbz1Q#0) range that ports may occupy.

Don't run it in production, kids.

See: https://en.wikipedia.org/wiki/Port_(computer_networking)

    #define PORT 48888

A buffer size of 1024 has us read the client request in kilobyte chunks.

    #define BUFFER_SIZE 1024

The one and only response we need to furnish.

We tell the client that we're using [HTTP version 1.1][3], that everything is good,
and that we are sending it HTML encoded in [UTF-8][4], which is really a great character encoding, as it is greatly backwards compatible with ASCII, while gracefully allowing the full range of Unicode, without wasting too many bytes. As cleverly designed standards go, I like it almost as much as I like ISO-8601 and Base 64.

[3]: https://datatracker.ietf.org/doc/html/rfc9112
[4]: https://www.cl.cam.ac.uk/~mgk25/ucs/utf-8-history.txt

    const char *html_content = 
    "HTTP/1.1 200 OK\r\n"
    "Content-Type: text/html; charset=UTF-8\r\n\r\n"
    "<!DOCTYPE html>\r\n"
    "<html><head><title>Hello World over IP</title></head>\r\n"
    "<body><h1>Hello World!</h1></body></html>\r\n";

Note that we are not _using_ any UTF-8 here, because we don't need to.
But, we _could_ mess with `wchar_t` if we wanted to respond with something more exotic. This would not be a hello world, then, however.


### Entry Point

    int main() {

The server is just one function that sets up and enters an infinite listen loop.

Our locals include the server socket's file descriptor, the socket itself,

        int server_fd, new_socket;
        struct sockaddr_in address;
        int addrlen = sizeof(address);
        char buffer[BUFFER_SIZE] = {0};

Create a [socket][5] and store its file descriptor. Why it's called a _file_ descriptor
is outside the scope of this little lesson.

[5]: https://en.wikipedia.org/wiki/Unix_domain_socket

        if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
            perror("socket failed");
            exit(EXIT_FAILURE);
        }

        address.sin_family = AF_INET;
        address.sin_addr.s_addr = INADDR_ANY;
        address.sin_port = htons(PORT);

Bind the socket to the port.

        if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
            perror("bind failed");
            exit(EXIT_FAILURE);
        }

Listen for incoming connections using a backlog size of 3. The backlog parameter [specifies the maximum length][6] of the queue for pending connections. In other words, only 3 clients can play with this hello world at a time.

[6]: https://www.perplexity.ai/search/when-opening-a-unix-socket-we-Q0OyXVm6SSu0l.G9c5xTXw#0

        if (listen(server_fd, 3) < 0) {
            perror("listen failed");
            exit(EXIT_FAILURE);
        }

#### Listen Loop

        while(1) {

Wait for an incoming connection. If the connection failed, because there are too many open FDs or we've run out of memory, then say so and...try again.

Like I said, don't use this in production kids.

            if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {
                perror("accept failed");
                continue;
            }

Read the client request. If it failed for any reason, we say so and go back to listening. 

Otherwise, we...ignore the contents of the request, becase we'll always say "Hello World", regardless.

The request _would_ look something like this:

```http
GET / HTTP/1.1
Host: localhost:48888
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br, zstd
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Priority: u=1
```

            ssize_t bytes_read = read(new_socket, buffer, BUFFER_SIZE);
            if (bytes_read < 0) {
                perror("read failed");
                close(new_socket);
                continue;
            }

Lastly, send the response and close the connection.

            write(new_socket, html_content, strlen(html_content));

            close(new_socket);
        }

        return 0;
    }
