CREATE TABLE [dbo].[Customers] (
    [Id]       INT             NOT NULL,
    [name]     VARCHAR (50)    NULL,
    [motto]    VARCHAR (50)    NULL,
    [blog]     VARCHAR (200)   NULL,
    [hometown] VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

