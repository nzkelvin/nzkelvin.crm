function replace-wordsinfile($map, $path)
{
    if (!(Test-Path -Path $path))
    {
        Write-Host "The following path doesn't exist " + $path
        return
    }
    Write-Host "path: " + $path

    if (!$map)
    {
        $map = @{"ui-bg_glass_55_fbf9ee_1x400.png" = "ui_bg_glass_55_fbf9ee_1x400.png"}
    }

    $content = Get-Content $path
    #$map.Keys | % { Write-Host $_ " " $map.Item($_) }
    $map.Keys | % { $content = $content -replace $_, $map.Item($_) }
    Set-Content $path $content
    #Foreach ($item in $map)
    #{        
     #   (Get-Content $path) -replace $item.Keys, $item.Values | Set-Content $path
      #  Write-Host "Replaced " + $item.Keys + " with " + $item.Values
    #}

    return $true
}

function rename-files($map, $path)
{
    if (!(Test-Path -Path $path))
    {
        Write-Host "The following path doesn't exist " + $path
        return
    }
    Write-Host "path: " + $path

    if (!$map)
    {
        Write-Host "The map parameter is null. Exit"
        return
    }

    $map.Keys | % { if (Test-Path $path$_) {Rename-Item $path$_ $map.Item($_)} }

    #Foreach ($item in $map)
    #{        
    #    Rename-Item $path+$item.Keys $item.Values
    #}

    return $true
}

$jqMapParam = @{}
$jqMapParam.Add("jquery-ui.structure.css", "jquery_ui.structure.css")
$jqMapParam.Add("jquery-ui.structure.min.css", "jquery_ui.structure.min.css")
$jqMapParam.Add("jquery-ui.theme.css", "jquery_ui.theme.css")
$jqMapParam.Add("jquery-ui.theme.min.css", "jquery_ui.theme.min.css")
$jqMapParam.Add("jquery-ui.css", "jquery_ui.css")
$jqMapParam.Add("jquery-ui.js", "jquery_ui.js")
$jqMapParam.Add("jquery-ui.min.css", "jquery_ui.min.css")
$jqMapParam.Add("jquery-ui.min.js", "jquery_ui.min.js")

rename-files $jqMapParam "C:\Users\kelvi_000\Downloads\jquery-ui-1.11.4.custom\"

$mapParam = @{"ui-bg_glass_55_fbf9ee_1x400.png" = "ui_bg_glass_55_fbf9ee_1x400.png";
                "ui-bg_glass_65_ffffff_1x400.png" = "ui_bg_glass_65_ffffff_1x400.png";
                "ui-bg_glass_75_dadada_1x400.png" = "ui_bg_glass_75_dadada_1x400.png";
                "ui-bg_glass_75_e6e6e6_1x400.png" = "ui_bg_glass_75_e6e6e6_1x400.png";
                "ui-bg_glass_95_fef1ec_1x400.png" = "ui_bg_glass_95_fef1ec_1x400.png";
                "ui-bg_highlight-soft_75_cccccc_1x100.png" = "ui_bg_highlight-soft_75_cccccc_1x100.png";
                "ui-icons_222222_256x240.png" = "ui_icons_222222_256x240.png";
                "ui-icons_2e83ff_256x240.png" = "ui_icons_2e83ff_256x240.png";
                "ui-icons_454545_256x240.png" = "ui_icons_454545_256x240.png";
                "ui-icons_888888_256x240.png" = "ui_icons_888888_256x240.png";
                "ui-icons_cd0a0a_256x240.png" = "ui_icons_cd0a0a_256x240.png"}

rename-files $mapParam "C:\Users\kelvi_000\Downloads\jquery-ui-1.11.4.custom\images\"
replace-wordsinfile $mapParam "C:\Users\kelvi_000\Downloads\jquery-ui-1.11.4.custom\jquery_ui.min.css"