FROM php:8.3-fpm

# Update package list and install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libxpm-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    bash \
    fcgiwrap \
    libmcrypt-dev \
    libonig-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip exif pcntl bcmath opcache

# Install Composer
COPY --from=composer/composer:latest-bin composer /usr/bin/composer

# Install Node.js and npm (sem npm install/build aqui)
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm  # Atualiza npm globalmente, mas não instala dependências ainda

# Set the working directory
WORKDIR /var/www/html

# Copy dependency files first for caching
COPY package.json package-lock.json vite.config.js composer.json composer.lock ./
# Verifica se package.json existe
RUN test -f /var/www/html/package.json || (echo "Error: package.json not found" && exit 1)

# Copy the rest of the application
COPY . /var/www/html/

# Install Composer and Node.js dependencies, then build Vite
RUN composer install --optimize-autoloader \
    && npm install \
    && npm run build \
    && chown -R www-data:www-data /var/www/html/ \
    && ls -la /var/www/html/public/build/  # Verifica se o build foi bem-sucedido

# Set home directory for www-data and switch user
RUN usermod -d /var/www/html www-data
USER www-data

# Expose PHP-FPM port
EXPOSE 8000

# Start PHP-FPM
CMD ["php-fpm"]