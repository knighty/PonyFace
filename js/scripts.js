//
// Part Definitions
//

var parts = 
{ 
	//------------------------------------------------------------------

	//
	// Manes
	//

	"manes" :
		[
			{
				id: 1,
				name: "Applejack",
				colors: [
					{ name : "Mane" },
					{ name : "Hairband" }
				]
			},
			{
				id: 2,
				name: "Rarity"
			},
			{
				id: 3,
				name: "Twilight Sparkle"
			},
			{
				id: 5,
				name: "Fluttershy"
			},
			{
				id: 6,
				name: "Rainbow Dash"
			},
			{
				id: 101,
				name: "Kimi Sparkle",
				colors: [
					{ name : "Mane" },
					{ name : "Highlight" }
				]
			}
		],

	//------------------------------------------------------------------

	//
	// Mouths
	//

	"mouths" :
		[
			{
				id: 1,
				name: "Normal"
			},
			{
				id: 2,
				name: "Open"
			},
			{
				id: 3,
				name: "Pout"
			},
			{
				id: 4,
				name: "Scrunch"
			},
			{
				id: 5,
				name: "Grimace"
			},
			{
				id: 6,
				name: "Sad"
			}
		],

	//------------------------------------------------------------------

	//
	// Horns
	//

	"horns" :
		[
			{
				id: 0,
				name: "No Horn"
			},
			{
				id: 1,
				name: "Standard Unicorn",
				magic: 1
			}
		],

	//------------------------------------------------------------------

	//
	// Eye Lids
	//

	"eyeLids" :
		[
			{
				id: 0,
				name: "None"
			},
			{
				id: 1,
				name: "Angled Up"
			},
			{
				id: 2,
				name: "Angled Down"
			},
			{
				id: 3,
				name: "Flat"
			}
		],

	//------------------------------------------------------------------

	//
	// Bottom Eye Lids
	//

	"bottomEyeLids" :
		[
			{
				id: 0,
				name: "None"
			},
			{
				id: 1,
				name: "Curved Up"
			},
			{
				id: 2,
				name: "Blush"
			},
			{
				id: 3,
				name: "Crying"
			}
		],

	//------------------------------------------------------------------

	//
	// Accessories
	//

	"accessories" :
		[
			{
				id: 1,
				name: "Bow"
			},
			{
				id: 2,
				name: "Applejack Hat"
			},
			{
				id: 3,
				name: "Hair Flowers"
			},
			{
				id: 4,
				name: "Sunglasses"
			},
			{
				id: 5,
				name: "Freckles (Cheek)"
			},
			{
				id: 6,
				name: "Freckles (Nose)"
			},
			{
				id: 7,
				name: "Vinyl Shades"
			}
		]
};

//------------------------------------------------------------------

function PopulateForm( )
{
	// Manes
	var mane_previews = $('<div class="preview-gallery">' );
	$("#mane").after( mane_previews );
	for ( var m = 0; m < parts.manes.length; m++ )
	{
		var mane = parts.manes[ m ];

		mane_previews.append( '<div class="preview"><input type="radio" data-id="' + m + '" name="mane" value="' + mane.id + '" /><iframe data-override="mane" data-id="' + mane.id + '"" src="mare.svg"></iframe><span>' + mane.name + '</span></div>' );
	}
	$("input[name=mane]").change( function( )
	{
		var colors = parts.manes[ $(this).data("id") ].colors;

		if ( !( colors instanceof Array ) )
		{
			colors = [ { "name" : "Mane" } ];
		}

		console.log( colors );

		$(".hairColorInput").each( function( idx ) 
		{
			$(this).hide( );

			if ( idx <= colors.length - 1 )
			{
				$(this).show( );
				$(this).find("label").text( colors[ idx ].name );
			}
		} );

		UpdateImage( );
	} );

	// Mouths
	var mouth_previews = $('<div class="preview-gallery">' );
	$("#mouth").after( mouth_previews );
	for ( var m = 0; m < parts.mouths.length; m++ )
	{
		var mouth = parts.mouths[ m ];

		mouth_previews.append( '<div class="preview"><input type="radio" name="mouth" value="' + mouth.id + '" /><iframe data-override="mouth" data-id="' + mouth.id + '"" src="mare.svg"></iframe><span>' + mouth.name + '</span></div>' )
	}
	$("input[name=mouth]").change( function( )
	{
		UpdateImage( );
	} );

	// Horns
	for ( var m = 0; m < parts.horns.length; m++ )
	{
		var horn = parts.horns[ m ];

		$("#horn").append( "<option value='" + horn.id + "'>" + horn.name + "</option>" );
	}
	$("#horn").change( );

	// Eye Lids
	var eye_lid_previews = $('<div class="preview-gallery">' );
	$("#eyeLid").after( eye_lid_previews );
	for ( var m = 0; m < parts.eyeLids.length; m++ )
	{
		var eyeLid = parts.eyeLids[ m ];

		eye_lid_previews.append( '<div class="preview"><input type="radio" name="eyeLid" value="' + eyeLid.id + '" /><iframe data-override="eyeLid" data-id="' + eyeLid.id + '"" src="mare.svg"></iframe><span>' + eyeLid.name + '</span></div>' )
	}
	$("input[name=eyeLid]").change( function( )
	{
		UpdateImage( );
	} );

	// Eye Lids Bottom
	var eye_lid_bottom_previews = $('<div class="preview-gallery">' );
	$("#eyeBottom").after( eye_lid_bottom_previews );
	for ( var m = 0; m < parts.bottomEyeLids.length; m++ )
	{
		var eyeLid = parts.bottomEyeLids[ m ];

		eye_lid_bottom_previews.append( '<div class="preview"><input type="radio" name="eyeLidBottom" value="' + eyeLid.id + '" /><iframe data-override="eyeBottomExpression" data-id="' + eyeLid.id + '"" src="mare.svg"></iframe><span>' + eyeLid.name + '</span></div>' )
	}
	$("input[name=eyeLidBottom]").change( function( )
	{
		UpdateImage( );
	} );

	$("#creator input[type=color]").each( function()
	{
		SetupColorInput( $(this) );
	} );
}

//------------------------------------------------------------------

//
// Setup preview windows
//

$( document ).on( "click", "#creator .preview", function( )
{
	$(this).find( "input" ).prop('checked',true);
	$(this).find( "input" ).change( );
} );

//------------------------------------------------------------------

//
// Accessories
//

function AddAccessory( )
{
	var accessory = $("<div>");

	var a = $("<select name='accessory_ids[]'/>");

	for ( var m = 0; m < parts.accessories.length; m++ )
	{
		var _accessory = parts.accessories[ m ];

		a.append( "<option value='" + _accessory.id + "'>" + _accessory.name + "</option>" );
	}

	var c = $("<input name='accessory_colors[]' type='color' />");

	var b = $( "<button onclick='return RemoveAccessory( this )'>Delete</button>" );

	accessory.append( a );
	accessory.append( c );
	SetupColorInput( c );
	accessory.append( b );

	$("#accessories").append( accessory );

	UpdateImage( );

	return false;
}

function RemoveAccessory( e )
{
	$( e ).parent( ).remove( );

	UpdateImage( );

	return false;
}

//------------------------------------------------------------------

//
// Update Image
//

function UpdateImage( )
{
	var url = "#";

	url += $("#bodyColor").val( ).substring( 1 );
	url += ";mane=" + $("input[name=mane]:checked").val( );

	url += ";hairColor=" + $("#hairColor1").val( ).substring( 1 );
	if ( $("#hairColor2").val( ).substring( 1 ) != "000000" )
		url += "," + $("#hairColor2").val( ).substring( 1 );

	url += ";eyeTop=" + $("#eyeColorTop").val( ).substring( 1 );
	url += ";eyeBottom=" + $("#eyeColorBottom").val( ).substring( 1 );

	var accessories = [];
	$("#accessories div").each( function( index )
	{
		accessories[ index ] = {};
		accessories[ index ].id = $(this).find("select[name='accessory_ids[]']").val( );;
		accessories[ index ].color = $(this).find("input[name='accessory_colors[]']").val( ).substring( 1 );

		console.log( accessories[ index ] );
	} );

	if ( accessories.length > 0 )
	{
		url += ";accessory=";

		for ( var a = 0; a < accessories.length; a++ )
		{
			if ( a > 0 )
			{
				url += ",";
			}

			url += accessories[ a ].id;
			if ( accessories[ a ].color != "000000" )
			{
			 	url += ":" + accessories[ a ].color;
			}
		}
	}

	if ( $("#horn").val( ) != 0 )
		url += ";horn=" + $("#horn").val( );

	if ( $("input[name=mouth]:checked").val( ) > 1 )
		url += ";mouth=" + $("input[name=mouth]:checked").val( );

	if ( $("input[name=eyeLidBottom]:checked").val( ) != 0 )
		url += ";eyeBottomExpression=" + $("input[name=eyeLidBottom]:checked").val( );

	if ( $("input[name=eyeLid]:checked").val( ) != 0 )
		url += ";eyeLid=" + $("input[name=eyeLid]:checked").val( );

	url += ";irisS=" + $("#irisSize").val( );

	$("#url").val( url );

	$("#urlLink").text( "Right Click -> Copy Link Address" );
	$("#urlLink").attr( "href", "mare.svg" + url );

	var element = $("#creatorPreview");	

	element.get(0).contentWindow.postMessage( url, "*" );

	$(".preview-gallery iframe").each( function()
	{
		$(this).get(0).contentWindow.postMessage( url + ";" + $(this).data("override") + "=" + $(this).data("id"), "*" );
	} );

	//element.attr( "data", url );
	//element.parent( ).append( element );
}

$(document).on( "change", "#creator input, #creator select", function()
{
	UpdateImage( );
} );

$(document).on( "keyup", "#creator input, #creator select", function()
{
	$( this ).change( );
} );

//------------------------------------------------------------------

function SetupColorInput( input )
{
	var hex = $("<input style='margin-left:5px;' type='text' />");
	hex.val( $(input).val( ) );

	var _this = input;

	hex.change( function( )
	{
		$(_this).val( $(this).val( ) );
		$(_this).change();
	} );

	hex.keyup( function()
	{
		$(this).val( $(this).val( ).substring(0,7) );

		if ( $(this).val( ).length == 7 )
			$(this).change( );
	} );

	$(input).change( function( )
	{
		hex.val( $(this).val( ) );
	} );

	$(input).after( hex );
}

//------------------------------------------------------------------

//
// Tabs
//

$(document).on( "click", ".editor-tab-bar li", function()
{
	$(".editor-tab-bar li").removeClass("selected");
	$(".editor-tabs li").addClass("hidden");

	var tab = $(this).data("tab");
	$(".editor-tab-bar li").each( function( )
	{
		if ( $(this).data("tab") == tab )
		{
			$(this).addClass( "selected" );
		}
	} );
	$(".editor-tabs li").each( function( )
	{
		if ( $(this).data("tab") == tab )
		{
			$(this).removeClass( "hidden" );
		}
	} );
} );

//------------------------------------------------------------------

function FitWindow( )
{
	var height = $(".editor-center").height( );

	var width = $(".toolbar").width( ) - height;

	$(".preview-pane").css("margin-left",width);

	$(".property-editor").css("width",width);

	$("#creatorPreview").width( height );
	$("#creatorPreview").height( height );
}

//------------------------------------------------------------------

$(window).resize( function( )
{
	FitWindow( );
} );

$(document).ready( function( )
{
	PopulateForm( );

	setTimeout( function()
	{
		FitWindow( );
		UpdateImage( );
	}, 1000 );
} );