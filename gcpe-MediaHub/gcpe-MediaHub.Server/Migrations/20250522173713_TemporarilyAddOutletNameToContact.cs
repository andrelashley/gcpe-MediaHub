using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gcpe_MediaHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class TemporarilyAddOutletNameToContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        { /*this already exists int he DB */
            //migrationBuilder.AddColumn<string>(
            //    name: "OutletName",
            //    table: "MediaContacts",
            //    type: "nvarchar(max)",
            //    nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "OutletName",
            //    table: "MediaContacts");
        }
    }
}
