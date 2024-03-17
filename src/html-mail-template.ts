export const htmlMailTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <title>##report_title##</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Maksymilian Bahr">
</head>

<body style="margin: 5px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';">
    <table style="max-width: 800px;">
        <tr>
            <td style="text-align: left;">
                <h1>##report_title_h1##</h1>
            </td>
            <td style="text-align: right;">
                ##project_logo##
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center;">
                    <h2 style="margin-top: 16px; text-align: left;">Execution Summary</h2>
                        <table style="padding: 10px; border: 1px solid #ecf0f3; background-color: #fbfbfb; margin-bottom: 20px; width: 100%;">
                            <tr>
                                <td style="border: 1px solid #ecf0f3; background-color: white; padding: 10px 5px; margin-left: 20px; margin-right: 20px; margin-top: 20px;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                    ##summary_numbers##
                                    </table>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding-bottom: 16px;">
                                ##summary_percentage##
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table style="width: 100%; border-collapse: collapse;">
                                        ##summary_duration##
                                    </table>
                                </td>
                            </tr>
                        </table>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: left;">
                <h2>Domain Test Summary</h2>
                <table style="width: 100%; vertical-align: middle; margin-bottom: 16px; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="padding: 5px 10px 20px 10px; border: 1px solid #ecf0f3; background-color: #fbfbfb;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <thead>
                                        <tr style="border-bottom: 1px solid #d9cdcd;">
                                            <th style="padding: 3px 3px; font-size: 14px; text-align: left;">Domain</th>
                                            <th style="padding: 3px 3px; font-size: 14px; text-align: left;"></th>
                                            <th style="padding: 3px 3px; font-size: 14px; text-align: left;">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody style="font-size: 12px">    
                                        ##domain_summary_rows##
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>            
        </tr>
    </table>    
</body>
</html>
`;
