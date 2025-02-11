/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2012                    */
/* Created on:     10/02/2025 09:43:18 p. m.                    */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHECADORES') and o.name = 'FK_CHECADOR_REFERENCE_USUARIOS')
alter table CHECADORES
   drop constraint FK_CHECADOR_REFERENCE_USUARIOS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHECADORES') and o.name = 'FK_CHECADOR_REFERENCE_PARADAS')
alter table CHECADORES
   drop constraint FK_CHECADOR_REFERENCE_PARADAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CONDUCTORES') and o.name = 'FK_CONDUCTO_REFERENCE_VEHICULO')
alter table CONDUCTORES
   drop constraint FK_CONDUCTO_REFERENCE_VEHICULO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CONDUCTORES') and o.name = 'FK_CONDUCTO_REFERENCE_USUARIOS')
alter table CONDUCTORES
   drop constraint FK_CONDUCTO_REFERENCE_USUARIOS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DUENOS') and o.name = 'FK_DUENOS_REFERENCE_VEHICULO')
alter table DUENOS
   drop constraint FK_DUENOS_REFERENCE_VEHICULO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DUENOS') and o.name = 'FK_DUENOS_REFERENCE_USUARIOS')
alter table DUENOS
   drop constraint FK_DUENOS_REFERENCE_USUARIOS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PASAJAEROS') and o.name = 'FK_PASAJAER_REFERENCE_USUARIOS')
alter table PASAJAEROS
   drop constraint FK_PASAJAER_REFERENCE_USUARIOS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('RUTAS_PARADAS_ORDENES') and o.name = 'FK_RUTAS_PA_REFERENCE_VEHICULO')
alter table RUTAS_PARADAS_ORDENES
   drop constraint FK_RUTAS_PA_REFERENCE_VEHICULO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('RUTAS_PARADAS_ORDENES') and o.name = 'FK_RUTAS_PA_REFERENCE_RUTAS')
alter table RUTAS_PARADAS_ORDENES
   drop constraint FK_RUTAS_PA_REFERENCE_RUTAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('RUTAS_PARADAS_ORDENES') and o.name = 'FK_RUTAS_PA_REFERENCE_PARADAS')
alter table RUTAS_PARADAS_ORDENES
   drop constraint FK_RUTAS_PA_REFERENCE_PARADAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('USUARIOS') and o.name = 'FK_USUARIOS_REFERENCE_PERSONAS')
alter table USUARIOS
   drop constraint FK_USUARIOS_REFERENCE_PERSONAS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('USUARIOS') and o.name = 'FK_USUARIOS_REFERENCE_TIPO_USU')
alter table USUARIOS
   drop constraint FK_USUARIOS_REFERENCE_TIPO_USU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHECADORES')
            and   type = 'U')
   drop table CHECADORES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONDUCTORES')
            and   type = 'U')
   drop table CONDUCTORES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DUENOS')
            and   type = 'U')
   drop table DUENOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PARADAS')
            and   type = 'U')
   drop table PARADAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PASAJAEROS')
            and   type = 'U')
   drop table PASAJAEROS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PERSONAS')
            and   type = 'U')
   drop table PERSONAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('RUTAS')
            and   type = 'U')
   drop table RUTAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('RUTAS_PARADAS_ORDENES')
            and   type = 'U')
   drop table RUTAS_PARADAS_ORDENES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TIPO_USUARIOS')
            and   type = 'U')
   drop table TIPO_USUARIOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('USUARIOS')
            and   type = 'U')
   drop table USUARIOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('VEHICULOS')
            and   type = 'U')
   drop table VEHICULOS
go

/*==============================================================*/
/* Table: CHECADORES                                            */
/*==============================================================*/
create table CHECADORES (
   ID_CHECADOR          int                  identity,
   ID_USUARIO           int                  null,
   ID_PARADA            int                  null,
   constraint PK_CHECADORES primary key (ID_CHECADOR)
)
go

/*==============================================================*/
/* Table: CONDUCTORES                                           */
/*==============================================================*/
create table CONDUCTORES (
   ID_CONDUCTORE        int                  identity,
   ID_VEHICULOS         int                  null,
   ID_USUARIO           int                  null,
   constraint PK_CONDUCTORES primary key (ID_CONDUCTORE)
)
go

/*==============================================================*/
/* Table: DUENOS                                                */
/*==============================================================*/
create table DUENOS (
   ID_DUENO             int                  identity,
   ID_VEHICULOS         int                  null,
   ID_USUARIO           int                  null,
   constraint PK_DUENOS primary key (ID_DUENO)
)
go

/*==============================================================*/
/* Table: PARADAS                                               */
/*==============================================================*/
create table PARADAS (
   ID_PARADA            int                  identity,
   LATITUD              decimal              null,
   LONGITUD             decimal              null,
   ACTIVO               tinyint              null,
   NOMBRE               varchar(255)         null,
   constraint PK_PARADAS primary key (ID_PARADA)
)
go

/*==============================================================*/
/* Table: PASAJAEROS                                            */
/*==============================================================*/
create table PASAJAEROS (
   ID_PASAJERO          int                  not null,
   ID_USUARIO           int                  null,
   constraint PK_PASAJAEROS primary key (ID_PASAJERO)
)
go

/*==============================================================*/
/* Table: PERSONAS                                              */
/*==============================================================*/
create table PERSONAS (
   ID_PERSONA           int                  identity,
   NOMBRE               varchar(255)         null,
   APELLIDO_PAT         varchar(255)         null,
   APELLIDO_MAT         varchar(255)         null,
   SEXO                 tinyint              null,
   FECHA_NAC            date                 null,
   CURP                 varchar(255)         null,
   RFC                  varchar(255)         null,
   ACTIVO               tinyint              null,
   constraint PK_PERSONAS primary key (ID_PERSONA)
)
go

/*==============================================================*/
/* Table: RUTAS                                                 */
/*==============================================================*/
create table RUTAS (
   ID_RUTA              int                  identity,
   NOMBRE               varchar(255)         null,
   ACTIVO               tinyint              null,
   constraint PK_RUTAS primary key (ID_RUTA)
)
go

/*==============================================================*/
/* Table: RUTAS_PARADAS_ORDENES                                 */
/*==============================================================*/
create table RUTAS_PARADAS_ORDENES (
   ID_RUTAS_PARADAS_ORDENE int                  identity,
   ID_RUTA              int                  null,
   ID_PARADA            int                  null,
   ID_VEHICULOS         int                  null,
   ORDEN                int                  null,
   ACTIVO               tinyint              null,
   constraint PK_RUTAS_PARADAS_ORDENES primary key (ID_RUTAS_PARADAS_ORDENE)
)
go

/*==============================================================*/
/* Table: TIPO_USUARIOS                                         */
/*==============================================================*/
create table TIPO_USUARIOS (
   ID_TIPO_USUARIO      int                  identity,
   NOMBRE               varchar(255)         null,
   DESCRIPCION          varchar(255)         null,
   ACTIVO               tinyint              null,
   constraint PK_TIPO_USUARIOS primary key (ID_TIPO_USUARIO)
)
go

/*==============================================================*/
/* Table: USUARIOS                                              */
/*==============================================================*/
create table USUARIOS (
   ID_USUARIO           int                  identity,
   ID_PERSONA           int                  null,
   ID_TIPO_USUARIO      int                  null,
   USUARIO              varchar(255)         null,
   CONTRASENA           varchar(255)         null,
   CORREO               varchar(255)         null,
   ACTIVO               tinyint              null,
   constraint PK_USUARIOS primary key (ID_USUARIO)
)
go

/*==============================================================*/
/* Table: VEHICULOS                                             */
/*==============================================================*/
create table VEHICULOS (
   ID_VEHICULO          int                  identity,
   NUMERO               varchar(255)         null,
   MATRICULA            varchar(255)         null,
   ACTIVO               varchar(255)         null,
   constraint PK_VEHICULOS primary key (ID_VEHICULO)
)
go

alter table CHECADORES
   add constraint FK_CHECADOR_REFERENCE_USUARIOS foreign key (ID_USUARIO)
      references USUARIOS (ID_USUARIO)
         on update cascade on delete cascade
go

alter table CHECADORES
   add constraint FK_CHECADOR_REFERENCE_PARADAS foreign key (ID_PARADA)
      references PARADAS (ID_PARADA)
         on update cascade on delete cascade
go

alter table CONDUCTORES
   add constraint FK_CONDUCTO_REFERENCE_VEHICULO foreign key (ID_VEHICULOS)
      references VEHICULOS (ID_VEHICULO)
         on update cascade on delete cascade
go

alter table CONDUCTORES
   add constraint FK_CONDUCTO_REFERENCE_USUARIOS foreign key (ID_USUARIO)
      references USUARIOS (ID_USUARIO)
         on update cascade on delete cascade
go

alter table DUENOS
   add constraint FK_DUENOS_REFERENCE_VEHICULO foreign key (ID_VEHICULOS)
      references VEHICULOS (ID_VEHICULO)
         on update cascade on delete cascade
go

alter table DUENOS
   add constraint FK_DUENOS_REFERENCE_USUARIOS foreign key (ID_USUARIO)
      references USUARIOS (ID_USUARIO)
         on update cascade on delete cascade
go

alter table PASAJAEROS
   add constraint FK_PASAJAER_REFERENCE_USUARIOS foreign key (ID_USUARIO)
      references USUARIOS (ID_USUARIO)
         on update cascade on delete cascade
go

alter table RUTAS_PARADAS_ORDENES
   add constraint FK_RUTAS_PA_REFERENCE_VEHICULO foreign key (ID_VEHICULOS)
      references VEHICULOS (ID_VEHICULO)
         on update cascade on delete cascade
go

alter table RUTAS_PARADAS_ORDENES
   add constraint FK_RUTAS_PA_REFERENCE_RUTAS foreign key (ID_RUTA)
      references RUTAS (ID_RUTA)
         on update cascade on delete cascade
go

alter table RUTAS_PARADAS_ORDENES
   add constraint FK_RUTAS_PA_REFERENCE_PARADAS foreign key (ID_PARADA)
      references PARADAS (ID_PARADA)
         on update cascade on delete cascade
go

alter table USUARIOS
   add constraint FK_USUARIOS_REFERENCE_PERSONAS foreign key (ID_PERSONA)
      references PERSONAS (ID_PERSONA)
         on update cascade on delete cascade
go

alter table USUARIOS
   add constraint FK_USUARIOS_REFERENCE_TIPO_USU foreign key (ID_TIPO_USUARIO)
      references TIPO_USUARIOS (ID_TIPO_USUARIO)
         on update cascade on delete cascade
go

