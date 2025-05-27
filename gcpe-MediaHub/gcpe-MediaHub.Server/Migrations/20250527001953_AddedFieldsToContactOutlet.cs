using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gcpe_MediaHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedFieldsToContactOutlet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastRequestDate",
                table: "ContactOutlets",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "NoLongerWorksHere",
                table: "ContactOutlets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PhoneCallIn",
                table: "ContactOutlets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneMobile",
                table: "ContactOutlets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhonePrimary",
                table: "ContactOutlets",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastRequestDate",
                table: "ContactOutlets");

            migrationBuilder.DropColumn(
                name: "NoLongerWorksHere",
                table: "ContactOutlets");

            migrationBuilder.DropColumn(
                name: "PhoneCallIn",
                table: "ContactOutlets");

            migrationBuilder.DropColumn(
                name: "PhoneMobile",
                table: "ContactOutlets");

            migrationBuilder.DropColumn(
                name: "PhonePrimary",
                table: "ContactOutlets");
        }
    }
}
