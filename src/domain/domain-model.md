erDiagram

    %% =======================
    %% USUARIOS SIMPLIFICADO
    %% =======================

    USUARIO {
        int id
        string nombre
        string email
        string password_hash
        string telefono
        string rol
        int puntos_fidelidad
        date fecha_creacion
    }

    %% =======================
    %% SERVICIOS SIMPLIFICADO
    %% =======================

    SERVICIO {
        int id
        string nombre
        string descripcion
        float precio_base
        int duracion_minutos
        string imagen_principal
        json imagenes
        boolean activo
    }

    %% =======================
    %% TURNOS SIMPLIFICADO
    %% =======================

    TURNO {
        int id
        date fecha
        time hora_inicio
        time hora_fin
        float precio_cobrado
        string estado
        string tipo_servicio
        date fecha_creacion
    }

    %% =======================
    %% PRODUCTOS E-COMMERCE
    %% =======================

    CATEGORIA {
        int id
        string nombre
        string descripcion
        boolean activo
    }

    PRODUCTO {
        int id
        string nombre
        string descripcion
        float precio
        int stock
        string imagen_principal
        json imagenes
        boolean destacado
        boolean activo
        date fecha_creacion
    }

    VARIANTE_PRODUCTO {
        int id
        string nombre
        string color
        string talla
        float precio
        int stock
    }

    %% =======================
    %% FAVORITOS
    %% =======================

    FAVORITO {
        int id
        date fecha_creacion
    }

    ITEM_FAVORITO {
        int id
        date fecha_agregado
    }

    %% =======================
    %% CARRITO
    %% =======================

    CARRITO {
        int id
        date fecha_actualizacion
    }

    ITEM_CARRITO {
        int id
        int cantidad
        float precio_unitario
    }

    %% =======================
    %% PEDIDOS
    %% =======================

    PEDIDO {
        int id
        string numero_pedido
        float subtotal
        float descuento
        float total
        string estado
        text notas
        date fecha_creacion
    }

    ITEM_PEDIDO {
        int id
        string nombre_producto
        int cantidad
        float precio_unitario
        float subtotal
    }

    %% =======================
    %% CUPONES
    %% =======================

    CUPON {
        int id
        string codigo
        string tipo
        float valor
        float monto_minimo
        int usos_maximos
        int usos_realizados
        date fecha_inicio
        date fecha_fin
        boolean activo
    }

    %% =======================
    %% FIDELIZACION Y TRACKING
    %% =======================

    MOVIMIENTO_PUNTOS {
        int id
        int puntos
        string tipo
        string evento
        string concepto
        json datos_adicionales
        date fecha
    }

    %% =======================
    %% NOTIFICACIONES
    %% =======================

    NOTIFICACION {
        int id
        string tipo
        string asunto
        text mensaje
        boolean enviado
        date fecha_envio
        string email_destino
        date fecha_creacion
    }

    %% =======================
    %% PAGOS MERCADOPAGO
    %% =======================

    PAGO {
        int id
        float monto
        string estado
        string tipo_operacion
        date fecha_creacion
    }

    TRANSACCION_MP {
        int id
        string preference_id
        string payment_id
        string payment_type
        int installments
        float transaction_amount
        string status
        json webhook_data
        date fecha_creacion
    }

    %% =======================
    %% RESEÑAS
    %% =======================

    RESENA {
        int id
        int calificacion
        text comentario
        string tipo
        boolean aprobada
        date fecha_creacion
    }

    %% =======================
    %% CONTACTO
    %% =======================

    MENSAJE_CONTACTO {
        int id
        string nombre
        string email
        string telefono
        text mensaje
        boolean respondido
        date fecha_creacion
    }

    %% =======================
    %% RELACIONES
    %% =======================

    %% Usuarios
    USUARIO ||--o{ TURNO : reserva
    USUARIO ||--|| CARRITO : tiene
    USUARIO ||--|| FAVORITO : tiene
    USUARIO ||--o{ PEDIDO : realiza
    USUARIO ||--o{ PAGO : realiza
    USUARIO ||--o{ RESENA : escribe
    USUARIO ||--o{ MENSAJE_CONTACTO : envía
    USUARIO ||--o{ MOVIMIENTO_PUNTOS : acumula
    USUARIO ||--o{ NOTIFICACION : recibe

    %% Servicios y Turnos
    SERVICIO ||--o{ TURNO : para
    TURNO ||--o| PAGO : paga

    %% Productos
    CATEGORIA ||--o{ PRODUCTO : agrupa
    PRODUCTO ||--o{ VARIANTE_PRODUCTO : tiene
    PRODUCTO ||--o{ RESENA : recibe

    %% Favoritos
    FAVORITO ||--o{ ITEM_FAVORITO : contiene
    PRODUCTO ||--o{ ITEM_FAVORITO : marcado

    %% Carrito
    CARRITO ||--o{ ITEM_CARRITO : contiene
    VARIANTE_PRODUCTO ||--o{ ITEM_CARRITO : en

    %% Pedidos
    PEDIDO ||--o{ ITEM_PEDIDO : incluye
    VARIANTE_PRODUCTO ||--o{ ITEM_PEDIDO : vendido
    PEDIDO ||--o| CUPON : aplica

    %% Pagos
    PAGO ||--o| PEDIDO : paga
    PAGO ||--o{ TRANSACCION_MP : registra