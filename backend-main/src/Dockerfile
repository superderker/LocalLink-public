# Use the official Golang image to create a build artifact.
# This is based on Debian and sets the GOPATH to /go.
FROM golang:1.21.6 as builder

# Create and change to the app directory.
WORKDIR /app

# Retrieve application dependencies.
# This allows the container build to reuse cached dependencies.
COPY go.* ./
RUN go mod download

# Copy local code to the container image.
COPY . ./

# Build the binary.
# -o backend specifies the output binary name, reducing ambiguity.
RUN CGO_ENABLED=0 GOOS=linux go build -v -o backend

# Use a Docker multi-stage build to create a lean production image.
# https://docs.docker.com/develop/develop-images/multistage-build/
# Use the official Alpine image for a lean production container.
FROM alpine:latest  
RUN apk --no-cache add ca-certificates

# Copy the binary to the production image from the builder stage.
COPY --from=builder /app/backend /backend
COPY envFiles/ ./envFiles/
# Run the web service on container startup.
CMD ["/backend"]
