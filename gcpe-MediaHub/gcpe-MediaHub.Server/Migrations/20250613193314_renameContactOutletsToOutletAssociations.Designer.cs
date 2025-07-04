﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using gcpe_MediaHub.Server.Data;

#nullable disable

namespace gcpe_MediaHub.Server.Migrations
{
    [DbContext(typeof(MediaHubContext))]
    [Migration("20250613193314_renameContactOutletsToOutletAssociations")]
    partial class renameContactOutletsToOutletAssociations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.MediaContact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CallInPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPressGallery")
                        .HasColumnType("bit");

                    b.Property<string>("JobTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastActive")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobilePhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OutletName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SocialMediaInstagramURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SocialMediaXURL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("MediaContacts");
                });

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.MediaOutlet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsMajorMedia")
                        .HasColumnType("bit");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LanguageShortName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MediaTypes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NewsDeskPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PrimaryPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SocialMediaInstagramURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SocialMediaXURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WebsiteURL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("MediaOutlets");
                });

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.MediaRequest", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime?>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("LeadMinistry")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RequestType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RequestedBy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("RequestedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Resolution")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SharedWith")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RequestedBy");

                    b.ToTable("MediaRequests");
                });

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.OutletAssociation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ContactId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("LastRequestDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("NoLongerWorksHere")
                        .HasColumnType("bit");

                    b.Property<int>("OutletId")
                        .HasColumnType("int");

                    b.Property<string>("PhoneCallIn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneMobile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhonePrimary")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ContactId");

                    b.HasIndex("OutletId");

                    b.ToTable("OutletAssociations");
                });

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.MediaRequest", b =>
                {
                    b.HasOne("gcpe_MediaHub.Server.Models.MediaContact", "Contact")
                        .WithMany("Requests")
                        .HasForeignKey("RequestedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Contact");
                });

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.OutletAssociation", b =>
                {
                    b.HasOne("gcpe_MediaHub.Server.Models.MediaContact", "Contact")
                        .WithMany("Outlets")
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("gcpe_MediaHub.Server.Models.MediaOutlet", "Outlet")
                        .WithMany()
                        .HasForeignKey("OutletId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Contact");

                    b.Navigation("Outlet");
                });

            modelBuilder.Entity("gcpe_MediaHub.Server.Models.MediaContact", b =>
                {
                    b.Navigation("Outlets");

                    b.Navigation("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}
