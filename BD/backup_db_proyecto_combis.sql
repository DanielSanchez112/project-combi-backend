PGDMP                       }            db_project_combis    17.2    17.2 Y    &           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            '           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            (           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            )           1262    16388    db_project_combis    DATABASE     �   CREATE DATABASE db_project_combis WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
 !   DROP DATABASE db_project_combis;
                     postgres    false            �            1259    16390 
   checadores    TABLE     t   CREATE TABLE public.checadores (
    id_checador integer NOT NULL,
    id_usuario integer,
    id_parada integer
);
    DROP TABLE public.checadores;
       public         heap r       postgres    false            �            1259    16389    checadores_id_checador_seq    SEQUENCE     �   CREATE SEQUENCE public.checadores_id_checador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.checadores_id_checador_seq;
       public               postgres    false    218            *           0    0    checadores_id_checador_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.checadores_id_checador_seq OWNED BY public.checadores.id_checador;
          public               postgres    false    217            �            1259    16397    conductores    TABLE     x   CREATE TABLE public.conductores (
    id_conductor integer NOT NULL,
    id_vehiculo integer,
    id_usuario integer
);
    DROP TABLE public.conductores;
       public         heap r       postgres    false            �            1259    16396    conductores_id_conductor_seq    SEQUENCE     �   CREATE SEQUENCE public.conductores_id_conductor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.conductores_id_conductor_seq;
       public               postgres    false    220            +           0    0    conductores_id_conductor_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.conductores_id_conductor_seq OWNED BY public.conductores.id_conductor;
          public               postgres    false    219            �            1259    16404    duenos    TABLE     o   CREATE TABLE public.duenos (
    id_dueno integer NOT NULL,
    id_vehiculo integer,
    id_usuario integer
);
    DROP TABLE public.duenos;
       public         heap r       postgres    false            �            1259    16403    duenos_id_dueno_seq    SEQUENCE     �   CREATE SEQUENCE public.duenos_id_dueno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.duenos_id_dueno_seq;
       public               postgres    false    222            ,           0    0    duenos_id_dueno_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.duenos_id_dueno_seq OWNED BY public.duenos.id_dueno;
          public               postgres    false    221            �            1259    16411    paradas    TABLE     �   CREATE TABLE public.paradas (
    id_parada integer NOT NULL,
    latitud numeric,
    longitud numeric,
    activo smallint,
    nombre character varying(255)
);
    DROP TABLE public.paradas;
       public         heap r       postgres    false            �            1259    16410    paradas_id_parada_seq    SEQUENCE     �   CREATE SEQUENCE public.paradas_id_parada_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.paradas_id_parada_seq;
       public               postgres    false    224            -           0    0    paradas_id_parada_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.paradas_id_parada_seq OWNED BY public.paradas.id_parada;
          public               postgres    false    223            �            1259    16419 
   pasajaeros    TABLE     ]   CREATE TABLE public.pasajaeros (
    id_pasajero integer NOT NULL,
    id_usuario integer
);
    DROP TABLE public.pasajaeros;
       public         heap r       postgres    false            �            1259    16425    personas    TABLE     4  CREATE TABLE public.personas (
    id_persona integer NOT NULL,
    nombre character varying(255),
    apellido_pat character varying(255),
    apellido_mat character varying(255),
    sexo smallint,
    fecha_nac date,
    curp character varying(255),
    rfc character varying(255),
    activo smallint
);
    DROP TABLE public.personas;
       public         heap r       postgres    false            �            1259    16424    personas_id_persona_seq    SEQUENCE     �   CREATE SEQUENCE public.personas_id_persona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.personas_id_persona_seq;
       public               postgres    false    227            .           0    0    personas_id_persona_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.personas_id_persona_seq OWNED BY public.personas.id_persona;
          public               postgres    false    226            �            1259    16434    rutas    TABLE     t   CREATE TABLE public.rutas (
    id_ruta integer NOT NULL,
    nombre character varying(255),
    activo smallint
);
    DROP TABLE public.rutas;
       public         heap r       postgres    false            �            1259    16433    rutas_id_ruta_seq    SEQUENCE     �   CREATE SEQUENCE public.rutas_id_ruta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.rutas_id_ruta_seq;
       public               postgres    false    229            /           0    0    rutas_id_ruta_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.rutas_id_ruta_seq OWNED BY public.rutas.id_ruta;
          public               postgres    false    228            �            1259    16441    rutas_paradas_ordenes    TABLE     �   CREATE TABLE public.rutas_paradas_ordenes (
    id_rutas_paradas_orden integer NOT NULL,
    id_ruta integer,
    id_parada integer,
    id_vehiculo integer,
    orden integer,
    activo smallint
);
 )   DROP TABLE public.rutas_paradas_ordenes;
       public         heap r       postgres    false            �            1259    16440 0   rutas_paradas_ordenes_id_rutas_paradas_orden_seq    SEQUENCE     �   CREATE SEQUENCE public.rutas_paradas_ordenes_id_rutas_paradas_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 G   DROP SEQUENCE public.rutas_paradas_ordenes_id_rutas_paradas_orden_seq;
       public               postgres    false    231            0           0    0 0   rutas_paradas_ordenes_id_rutas_paradas_orden_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.rutas_paradas_ordenes_id_rutas_paradas_orden_seq OWNED BY public.rutas_paradas_ordenes.id_rutas_paradas_orden;
          public               postgres    false    230            �            1259    16448    tipo_usuarios    TABLE     �   CREATE TABLE public.tipo_usuarios (
    id_tipo_usuario integer NOT NULL,
    nombre character varying(255),
    descripcion character varying(255),
    activo smallint
);
 !   DROP TABLE public.tipo_usuarios;
       public         heap r       postgres    false            �            1259    16447 !   tipo_usuarios_id_tipo_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_usuarios_id_tipo_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.tipo_usuarios_id_tipo_usuario_seq;
       public               postgres    false    233            1           0    0 !   tipo_usuarios_id_tipo_usuario_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.tipo_usuarios_id_tipo_usuario_seq OWNED BY public.tipo_usuarios.id_tipo_usuario;
          public               postgres    false    232            �            1259    16457    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    id_persona integer,
    id_tipo_usuario integer,
    usuario character varying(255),
    contrasena character varying(255),
    correo character varying(255),
    activo smallint
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16456    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_id_usuario_seq;
       public               postgres    false    235            2           0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
          public               postgres    false    234            �            1259    16466 	   vehiculos    TABLE     �   CREATE TABLE public.vehiculos (
    id_vehiculo integer NOT NULL,
    numero character varying(255),
    matricula character varying(255),
    activo character varying(255)
);
    DROP TABLE public.vehiculos;
       public         heap r       postgres    false            �            1259    16465    vehiculos_id_vehiculo_seq    SEQUENCE     �   CREATE SEQUENCE public.vehiculos_id_vehiculo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.vehiculos_id_vehiculo_seq;
       public               postgres    false    237            3           0    0    vehiculos_id_vehiculo_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.vehiculos_id_vehiculo_seq OWNED BY public.vehiculos.id_vehiculo;
          public               postgres    false    236            R           2604    16393    checadores id_checador    DEFAULT     �   ALTER TABLE ONLY public.checadores ALTER COLUMN id_checador SET DEFAULT nextval('public.checadores_id_checador_seq'::regclass);
 E   ALTER TABLE public.checadores ALTER COLUMN id_checador DROP DEFAULT;
       public               postgres    false    218    217    218            S           2604    16400    conductores id_conductor    DEFAULT     �   ALTER TABLE ONLY public.conductores ALTER COLUMN id_conductor SET DEFAULT nextval('public.conductores_id_conductor_seq'::regclass);
 G   ALTER TABLE public.conductores ALTER COLUMN id_conductor DROP DEFAULT;
       public               postgres    false    220    219    220            T           2604    16407    duenos id_dueno    DEFAULT     r   ALTER TABLE ONLY public.duenos ALTER COLUMN id_dueno SET DEFAULT nextval('public.duenos_id_dueno_seq'::regclass);
 >   ALTER TABLE public.duenos ALTER COLUMN id_dueno DROP DEFAULT;
       public               postgres    false    222    221    222            U           2604    16414    paradas id_parada    DEFAULT     v   ALTER TABLE ONLY public.paradas ALTER COLUMN id_parada SET DEFAULT nextval('public.paradas_id_parada_seq'::regclass);
 @   ALTER TABLE public.paradas ALTER COLUMN id_parada DROP DEFAULT;
       public               postgres    false    223    224    224            V           2604    16428    personas id_persona    DEFAULT     z   ALTER TABLE ONLY public.personas ALTER COLUMN id_persona SET DEFAULT nextval('public.personas_id_persona_seq'::regclass);
 B   ALTER TABLE public.personas ALTER COLUMN id_persona DROP DEFAULT;
       public               postgres    false    227    226    227            W           2604    16437    rutas id_ruta    DEFAULT     n   ALTER TABLE ONLY public.rutas ALTER COLUMN id_ruta SET DEFAULT nextval('public.rutas_id_ruta_seq'::regclass);
 <   ALTER TABLE public.rutas ALTER COLUMN id_ruta DROP DEFAULT;
       public               postgres    false    229    228    229            X           2604    16444 ,   rutas_paradas_ordenes id_rutas_paradas_orden    DEFAULT     �   ALTER TABLE ONLY public.rutas_paradas_ordenes ALTER COLUMN id_rutas_paradas_orden SET DEFAULT nextval('public.rutas_paradas_ordenes_id_rutas_paradas_orden_seq'::regclass);
 [   ALTER TABLE public.rutas_paradas_ordenes ALTER COLUMN id_rutas_paradas_orden DROP DEFAULT;
       public               postgres    false    230    231    231            Y           2604    16451    tipo_usuarios id_tipo_usuario    DEFAULT     �   ALTER TABLE ONLY public.tipo_usuarios ALTER COLUMN id_tipo_usuario SET DEFAULT nextval('public.tipo_usuarios_id_tipo_usuario_seq'::regclass);
 L   ALTER TABLE public.tipo_usuarios ALTER COLUMN id_tipo_usuario DROP DEFAULT;
       public               postgres    false    232    233    233            Z           2604    16460    usuarios id_usuario    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       public               postgres    false    234    235    235            [           2604    16469    vehiculos id_vehiculo    DEFAULT     ~   ALTER TABLE ONLY public.vehiculos ALTER COLUMN id_vehiculo SET DEFAULT nextval('public.vehiculos_id_vehiculo_seq'::regclass);
 D   ALTER TABLE public.vehiculos ALTER COLUMN id_vehiculo DROP DEFAULT;
       public               postgres    false    236    237    237                      0    16390 
   checadores 
   TABLE DATA           H   COPY public.checadores (id_checador, id_usuario, id_parada) FROM stdin;
    public               postgres    false    218   �n                 0    16397    conductores 
   TABLE DATA           L   COPY public.conductores (id_conductor, id_vehiculo, id_usuario) FROM stdin;
    public               postgres    false    220   �n                 0    16404    duenos 
   TABLE DATA           C   COPY public.duenos (id_dueno, id_vehiculo, id_usuario) FROM stdin;
    public               postgres    false    222   �n                 0    16411    paradas 
   TABLE DATA           O   COPY public.paradas (id_parada, latitud, longitud, activo, nombre) FROM stdin;
    public               postgres    false    224   �n                 0    16419 
   pasajaeros 
   TABLE DATA           =   COPY public.pasajaeros (id_pasajero, id_usuario) FROM stdin;
    public               postgres    false    225   o                 0    16425    personas 
   TABLE DATA           v   COPY public.personas (id_persona, nombre, apellido_pat, apellido_mat, sexo, fecha_nac, curp, rfc, activo) FROM stdin;
    public               postgres    false    227   5o                 0    16434    rutas 
   TABLE DATA           8   COPY public.rutas (id_ruta, nombre, activo) FROM stdin;
    public               postgres    false    229   Ro                 0    16441    rutas_paradas_ordenes 
   TABLE DATA           w   COPY public.rutas_paradas_ordenes (id_rutas_paradas_orden, id_ruta, id_parada, id_vehiculo, orden, activo) FROM stdin;
    public               postgres    false    231   oo                 0    16448    tipo_usuarios 
   TABLE DATA           U   COPY public.tipo_usuarios (id_tipo_usuario, nombre, descripcion, activo) FROM stdin;
    public               postgres    false    233   �o       !          0    16457    usuarios 
   TABLE DATA           p   COPY public.usuarios (id_usuario, id_persona, id_tipo_usuario, usuario, contrasena, correo, activo) FROM stdin;
    public               postgres    false    235   -p       #          0    16466 	   vehiculos 
   TABLE DATA           K   COPY public.vehiculos (id_vehiculo, numero, matricula, activo) FROM stdin;
    public               postgres    false    237   Jp       4           0    0    checadores_id_checador_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.checadores_id_checador_seq', 1, false);
          public               postgres    false    217            5           0    0    conductores_id_conductor_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.conductores_id_conductor_seq', 1, false);
          public               postgres    false    219            6           0    0    duenos_id_dueno_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.duenos_id_dueno_seq', 1, false);
          public               postgres    false    221            7           0    0    paradas_id_parada_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.paradas_id_parada_seq', 1, false);
          public               postgres    false    223            8           0    0    personas_id_persona_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.personas_id_persona_seq', 1, false);
          public               postgres    false    226            9           0    0    rutas_id_ruta_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rutas_id_ruta_seq', 1, false);
          public               postgres    false    228            :           0    0 0   rutas_paradas_ordenes_id_rutas_paradas_orden_seq    SEQUENCE SET     _   SELECT pg_catalog.setval('public.rutas_paradas_ordenes_id_rutas_paradas_orden_seq', 1, false);
          public               postgres    false    230            ;           0    0 !   tipo_usuarios_id_tipo_usuario_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.tipo_usuarios_id_tipo_usuario_seq', 2, true);
          public               postgres    false    232            <           0    0    usuarios_id_usuario_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);
          public               postgres    false    234            =           0    0    vehiculos_id_vehiculo_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.vehiculos_id_vehiculo_seq', 1, false);
          public               postgres    false    236            ]           2606    16395    checadores checadores_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.checadores
    ADD CONSTRAINT checadores_pkey PRIMARY KEY (id_checador);
 D   ALTER TABLE ONLY public.checadores DROP CONSTRAINT checadores_pkey;
       public                 postgres    false    218            _           2606    16402    conductores conductores_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.conductores
    ADD CONSTRAINT conductores_pkey PRIMARY KEY (id_conductor);
 F   ALTER TABLE ONLY public.conductores DROP CONSTRAINT conductores_pkey;
       public                 postgres    false    220            a           2606    16409    duenos duenos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.duenos
    ADD CONSTRAINT duenos_pkey PRIMARY KEY (id_dueno);
 <   ALTER TABLE ONLY public.duenos DROP CONSTRAINT duenos_pkey;
       public                 postgres    false    222            c           2606    16418    paradas paradas_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.paradas
    ADD CONSTRAINT paradas_pkey PRIMARY KEY (id_parada);
 >   ALTER TABLE ONLY public.paradas DROP CONSTRAINT paradas_pkey;
       public                 postgres    false    224            e           2606    16423    pasajaeros pasajaeros_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.pasajaeros
    ADD CONSTRAINT pasajaeros_pkey PRIMARY KEY (id_pasajero);
 D   ALTER TABLE ONLY public.pasajaeros DROP CONSTRAINT pasajaeros_pkey;
       public                 postgres    false    225            g           2606    16432    personas personas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id_persona);
 @   ALTER TABLE ONLY public.personas DROP CONSTRAINT personas_pkey;
       public                 postgres    false    227            k           2606    16446 0   rutas_paradas_ordenes rutas_paradas_ordenes_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.rutas_paradas_ordenes
    ADD CONSTRAINT rutas_paradas_ordenes_pkey PRIMARY KEY (id_rutas_paradas_orden);
 Z   ALTER TABLE ONLY public.rutas_paradas_ordenes DROP CONSTRAINT rutas_paradas_ordenes_pkey;
       public                 postgres    false    231            i           2606    16439    rutas rutas_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.rutas
    ADD CONSTRAINT rutas_pkey PRIMARY KEY (id_ruta);
 :   ALTER TABLE ONLY public.rutas DROP CONSTRAINT rutas_pkey;
       public                 postgres    false    229            m           2606    16455     tipo_usuarios tipo_usuarios_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.tipo_usuarios
    ADD CONSTRAINT tipo_usuarios_pkey PRIMARY KEY (id_tipo_usuario);
 J   ALTER TABLE ONLY public.tipo_usuarios DROP CONSTRAINT tipo_usuarios_pkey;
       public                 postgres    false    233            o           2606    16464    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    235            q           2606    16473    vehiculos vehiculos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (id_vehiculo);
 B   ALTER TABLE ONLY public.vehiculos DROP CONSTRAINT vehiculos_pkey;
       public                 postgres    false    237            r           2606    16479    checadores fk_checador_parada    FK CONSTRAINT     �   ALTER TABLE ONLY public.checadores
    ADD CONSTRAINT fk_checador_parada FOREIGN KEY (id_parada) REFERENCES public.paradas(id_parada) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.checadores DROP CONSTRAINT fk_checador_parada;
       public               postgres    false    218    224    4707            s           2606    16474    checadores fk_checador_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.checadores
    ADD CONSTRAINT fk_checador_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.checadores DROP CONSTRAINT fk_checador_usuario;
       public               postgres    false    218    235    4719            t           2606    16489     conductores fk_conductor_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.conductores
    ADD CONSTRAINT fk_conductor_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.conductores DROP CONSTRAINT fk_conductor_usuario;
       public               postgres    false    235    220    4719            u           2606    16484 !   conductores fk_conductor_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.conductores
    ADD CONSTRAINT fk_conductor_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES public.vehiculos(id_vehiculo) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.conductores DROP CONSTRAINT fk_conductor_vehiculo;
       public               postgres    false    220    237    4721            v           2606    16499    duenos fk_dueno_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.duenos
    ADD CONSTRAINT fk_dueno_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.duenos DROP CONSTRAINT fk_dueno_usuario;
       public               postgres    false    4719    222    235            w           2606    16494    duenos fk_dueno_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.duenos
    ADD CONSTRAINT fk_dueno_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES public.vehiculos(id_vehiculo) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.duenos DROP CONSTRAINT fk_dueno_vehiculo;
       public               postgres    false    237    222    4721            x           2606    16504    pasajaeros fk_pasajero_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.pasajaeros
    ADD CONSTRAINT fk_pasajero_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.pasajaeros DROP CONSTRAINT fk_pasajero_usuario;
       public               postgres    false    225    235    4719            y           2606    16519 -   rutas_paradas_ordenes fk_rutas_paradas_parada    FK CONSTRAINT     �   ALTER TABLE ONLY public.rutas_paradas_ordenes
    ADD CONSTRAINT fk_rutas_paradas_parada FOREIGN KEY (id_parada) REFERENCES public.paradas(id_parada) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.rutas_paradas_ordenes DROP CONSTRAINT fk_rutas_paradas_parada;
       public               postgres    false    4707    231    224            z           2606    16514 +   rutas_paradas_ordenes fk_rutas_paradas_ruta    FK CONSTRAINT     �   ALTER TABLE ONLY public.rutas_paradas_ordenes
    ADD CONSTRAINT fk_rutas_paradas_ruta FOREIGN KEY (id_ruta) REFERENCES public.rutas(id_ruta) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.rutas_paradas_ordenes DROP CONSTRAINT fk_rutas_paradas_ruta;
       public               postgres    false    4713    231    229            {           2606    16509 /   rutas_paradas_ordenes fk_rutas_paradas_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.rutas_paradas_ordenes
    ADD CONSTRAINT fk_rutas_paradas_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES public.vehiculos(id_vehiculo) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.rutas_paradas_ordenes DROP CONSTRAINT fk_rutas_paradas_vehiculo;
       public               postgres    false    237    231    4721            |           2606    16524    usuarios fk_usuario_persona    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuario_persona FOREIGN KEY (id_persona) REFERENCES public.personas(id_persona) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT fk_usuario_persona;
       public               postgres    false    235    4711    227            }           2606    16529    usuarios fk_usuario_tipo    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuario_tipo FOREIGN KEY (id_tipo_usuario) REFERENCES public.tipo_usuarios(id_tipo_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT fk_usuario_tipo;
       public               postgres    false    4717    235    233                  x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �         �   x�U�A1E��)8��x7(Lji�ގ�W�C��m	�P��{� ����'��hxUZU�Z��55���S�4�J����1�؏]�f�ξ>�}�g�a�uLj3���T��5�Mx��u���\n����uL�      !      x������ � �      #      x������ � �     