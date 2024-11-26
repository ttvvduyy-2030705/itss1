#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define SERVER "192.168.4.126"
#define PORT 21
#define BUFFER_SIZE 1024

void send_command(int sock, const char *command) {
    write(sock, command, strlen(command));
}

void receive_response(int sock) {
    char buffer[BUFFER_SIZE];
    int bytes = read(sock, buffer, sizeof(buffer) - 1);
    if (bytes > 0) {
        buffer[bytes] = '\0';
        printf("%s", buffer);
    }
}

int main() {
    int sock;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];

    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    if (inet_pton(AF_INET, SERVER, &server_addr.sin_addr) <= 0) {
        perror("Invalid address/ Address not supported");
        close(sock);
        exit(EXIT_FAILURE);
    }

    if (connect(sock, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("Connection failed");
        close(sock);
        exit(EXIT_FAILURE);
    }

    receive_response(sock);

    snprintf(buffer, sizeof(buffer), "USER lathevinh\r\n");
    send_command(sock, buffer);
    receive_response(sock);

    snprintf(buffer, sizeof(buffer), "PASS 123456\r\n");
    send_command(sock, buffer);
    receive_response(sock);

    close(sock);
    return 0;
}
