using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gcpe_MediaHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class renameContactOutletsToOutletAssociations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactOutlets");

            migrationBuilder.CreateTable(
                name: "OutletAssociations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    OutletId = table.Column<int>(type: "int", nullable: false),
                    ContactEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhonePrimary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneMobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneCallIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoLongerWorksHere = table.Column<bool>(type: "bit", nullable: false),
                    LastRequestDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutletAssociations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OutletAssociations_MediaContacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "MediaContacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OutletAssociations_MediaOutlets_OutletId",
                        column: x => x.OutletId,
                        principalTable: "MediaOutlets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OutletAssociations_ContactId",
                table: "OutletAssociations",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_OutletAssociations_OutletId",
                table: "OutletAssociations",
                column: "OutletId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OutletAssociations");

            migrationBuilder.CreateTable(
                name: "ContactOutlets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    OutletId = table.Column<int>(type: "int", nullable: false),
                    ContactEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastRequestDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NoLongerWorksHere = table.Column<bool>(type: "bit", nullable: false),
                    PhoneCallIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneMobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhonePrimary = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactOutlets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactOutlets_MediaContacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "MediaContacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactOutlets_MediaOutlets_OutletId",
                        column: x => x.OutletId,
                        principalTable: "MediaOutlets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactOutlets_ContactId",
                table: "ContactOutlets",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactOutlets_OutletId",
                table: "ContactOutlets",
                column: "OutletId");
        }
    }
}
