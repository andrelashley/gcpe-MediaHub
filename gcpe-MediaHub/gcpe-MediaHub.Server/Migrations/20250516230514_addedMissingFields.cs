using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gcpe_MediaHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedMissingFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SocialMediaURL",
                table: "MediaContacts",
                newName: "SocialMediaXURL");

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "MediaRequests",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RequestBy",
                table: "MediaRequests",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequestType",
                table: "MediaRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedOn",
                table: "MediaRequests",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JobTitle",
                table: "MediaContacts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialMediaInstagramURL",
                table: "MediaContacts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MediaRequests_RequestBy",
                table: "MediaRequests",
                column: "RequestBy");

            migrationBuilder.AddForeignKey(
                name: "FK_MediaRequests_MediaContacts_RequestBy",
                table: "MediaRequests",
                column: "RequestBy",
                principalTable: "MediaContacts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaRequests_MediaContacts_RequestBy",
                table: "MediaRequests");

            migrationBuilder.DropIndex(
                name: "IX_MediaRequests_RequestBy",
                table: "MediaRequests");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "MediaRequests");

            migrationBuilder.DropColumn(
                name: "RequestBy",
                table: "MediaRequests");

            migrationBuilder.DropColumn(
                name: "RequestType",
                table: "MediaRequests");

            migrationBuilder.DropColumn(
                name: "RequestedOn",
                table: "MediaRequests");

            migrationBuilder.DropColumn(
                name: "JobTitle",
                table: "MediaContacts");

            migrationBuilder.DropColumn(
                name: "SocialMediaInstagramURL",
                table: "MediaContacts");

            migrationBuilder.RenameColumn(
                name: "SocialMediaXURL",
                table: "MediaContacts",
                newName: "SocialMediaURL");
        }
    }
}
