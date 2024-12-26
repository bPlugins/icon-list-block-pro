<?php

/**
 * Plugin Name: Icon List Block
 * Description: Show your icon list in web.
 * Version: 1.1.1
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: icon-list
 * @fs_premium_only /freemius
 * @fs_free_only, /bplugins_sdk
 */

// ABS PATH
if (!defined('ABSPATH')) {
    exit;
}

if (function_exists('ilb_fs')) {
    // This for .. if free plugin is installed, and when we will install pro plugin then uninstall free plugin
    register_activation_hook(__FILE__, function () {
        if (is_plugin_active('icon-list-block/index.php')) {
            deactivate_plugins('icon-list-block/index.php');
        }
        if (is_plugin_active('icon-list-block-pro/index.php')) {
            deactivate_plugins('icon-list-block-pro/index.php');
        }
    });
} else {
    // Constant
    define('ILB_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.1.1');
    define('ILB_DIR_URL', plugin_dir_url(__FILE__));
    define('ILB_DIR_PATH', plugin_dir_path(__FILE__));
    define('ILB_HAS_FREE', 'icon-list-block/index.php' === plugin_basename(__FILE__));
    define('ILB_HAS_PRO', 'icon-list-block-pro/index.php' === plugin_basename(__FILE__));

    if (! function_exists('ilb_fs')) {
        // Create a helper function for easy SDK access.
        function ilb_fs()
        {
            global $ilb_fs;

            if (! isset($ilb_fs)) {
                $fsStartPath = dirname(__FILE__) . '/freemius/start.php';
                $bSDKInitPath = dirname(__FILE__) . '/bplugins_sdk/init.php';

                if (ILB_HAS_PRO && file_exists($fsStartPath)) {
                    require_once $fsStartPath;
                } else if (ILB_HAS_FREE && file_exists($bSDKInitPath)) {
                    require_once $bSDKInitPath;
                }

                $ilbConfig = array(
                    'id'                  => '17174',
                    'slug'                => 'icon-list-block',
                    'premium_slug'        => 'icon-list-block-pro',
                    'type'                => 'plugin',
                    'public_key'          => 'pk_51f816736288458da2dd37c719fd3',
                    'is_premium'          => true,
                    'premium_suffix'      => 'Pro',
                    // If your plugin is a service ware, set this option to false.
                    'has_premium_version' => true,
                    'has_addons'          => false,
                    'has_paid_plans'      => true,
                    'trial'               => array(
                        'days'               => 7,
                        'is_require_payment' => true,
                    ),
                    'menu'                => array(
                        'slug'           => 'icon-list',
                        'first-path'           => 'tools.php?page=icon-list#/dashboard',
                        'support'        => false,
                        'parent'         => array(
                            'slug' => 'tools.php',
                        ),
                    ),
                );

                $ilb_fs = (ILB_HAS_PRO && file_exists($fsStartPath)) ? fs_dynamic_init($ilbConfig) : fs_lite_dynamic_init($ilbConfig);
            }

            return $ilb_fs;
        }

        // Init Freemius.
        ilb_fs();
        // Signal that SDK was initiated.
        do_action('ilb_fs_loaded');
    }

    // ... Your plugin's main file logic ...

    function ilbIsPremium()
    {
        return ILB_HAS_PRO ? ilb_fs()->can_use_premium_code() : false;
    }


    if (!class_exists('ILBPlugin')) {
        class ILBPlugin
        {
            public function __construct()
            {
                add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
                add_action('init', [$this, 'onInit']);

                // sub menu function hooks
                add_action('admin_menu', [$this, 'addToolsSubmenu']);
                add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);

                // Premium checker
                add_action('wp_ajax_ilbPipeChecker', [$this, 'ilbPipeChecker']);
                add_action('wp_ajax_nopriv_ilbPipeChecker', [$this, 'ilbPipeChecker']);
                add_action('admin_init', [$this, 'registerSettings']);
                add_action('rest_api_init', [$this, 'registerSettings']);
            }

            function ilbPipeChecker()
            {
                $nonce = $_POST['_wpnonce'] ?? null;

                if (!wp_verify_nonce($nonce, 'wp_ajax')) {
                    wp_send_json_error('Invalid Request');
                }

                wp_send_json_success([
                    'isPipe' => ilbIsPremium()
                ]);
            }

            function registerSettings()
            {
                register_setting('ilbUtils', 'ilbUtils', [
                    'show_in_rest' => [
                        'name' => 'ilbUtils',
                        'schema' => ['type' => 'string']
                    ],
                    'type' => 'string',
                    'default' => wp_json_encode(['nonce' => wp_create_nonce('wp_ajax')]),
                    'sanitize_callback' => 'sanitize_text_field'
                ]);
            }

            function enqueueBlockAssets()
            {
                wp_register_style('fontAwesome', ILB_DIR_URL . 'assets/css/font-awesome.min.css', [], '6.4.2'); // Icon
            }

            function onInit()
            {
                register_block_type(__DIR__ . '/build');
            }

            function addToolsSubmenu()
            {
                add_submenu_page(
                    'tools.php',                   // Parent slug (Tools menu)
                    __('Icon List Block', 'icon-list'), // Page title
                    __('Icon List Block', 'icon-list'), // Menu title
                    'manage_options',              // Capability required to access this menu
                    'icon-list',             // Menu slug
                    [$this, 'renderToolsPage']     // Callback function to render the page
                );
            }

            function renderTemplate($content)
            {
                $parseBlocks = parse_blocks($content);
                return render_block($parseBlocks[0]);
            }

            function renderToolsPage()
            { ?>
                <div id="bplAdminHelpPage" data-version='<?php echo esc_attr(ILB_VERSION) ?>' data-is-premium='<?php echo esc_attr(ilbIsPremium()); ?>'>
                    <div class='renderHere'>

                    </div>
                    <div class="templates" style='display: none;'>
                        <div class="default">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list /-->'); ?>
                        </div>
                        <div class="theme2">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list {"lists":[{"icon":{"class":"fa-solid fa-star"},"text":"List items with a star","des":"Type your description here","featureDes":"Feature with star","link":"dfdff","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"http://localhost/wordpress1/wp-content/uploads/2024/03/facebook.png"},{"icon":{"class":"fa-solid fa-check-circle"},"text":"List items with circle","des":"Type your description here","featureDes":"Feature with circle check","link":"dfdf","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fa-solid fa-check-square"},"text":"List items with check","des":"Type your description here","featureDes":"Feature with square check","link":"fdfd","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"},{"icon":{"class":"fa-solid fa-heart"},"text":"List items with heart","des":"Type your description here","featureDes":"Feature with star","link":"dfdff","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"}],"themeOptions":{"rightIconColor":"#4527A4","isBadge":true,"isUrlIcon":true,"isButton":true,"isMaxWidth":true},"columns":{"desktop":2,"tablet":2,"mobile":1},"themes":{"theme":"theme2"}} /-->'); ?>
                        </div>
                        <div class="theme3">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list {"lists":[{"icon":{"class":"fa-solid fa-star"},"text":"List items with a star","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"http://localhost/wordpress1/wp-content/uploads/2024/03/facebook.png"},{"icon":{"class":"fa-solid fa-check-circle"},"text":"List items with circle","des":"Type your description here","featureDes":"Feature with circle check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fa-solid fa-check-square"},"text":"List items with square check","des":"Type your description here","featureDes":"Feature with square check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"},{"icon":{"class":"fa-solid fa-heart"},"text":"List items with heart","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"},{"icon":{"class":"fas fa-check-square"},"text":"List item with square check","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fas fa-check-square"},"text":"List item with square check","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"}],"width":"660px","columns":{"desktop":3,"tablet":2,"mobile":1},"themes":{"theme":"theme3"}} /-->'); ?>
                        </div>
                        <div class="theme4">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list {"lists":[{"icon":{"class":"fa-solid fa-star"},"text":"List items with a star","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"http://localhost/wordpress1/wp-content/uploads/2024/03/facebook.png"},{"icon":{"class":"fa-solid fa-check-circle"},"text":"List items with circle","des":"Type your description here","featureDes":"Feature with circle check","link":"dfdf","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fa-solid fa-check-square"},"text":"List items with check","des":"Type your description here","featureDes":"Feature with square check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"},{"icon":{"class":"fa-solid fa-heart"},"text":"List items with heart","des":"Type your description here","featureDes":"Feature with star","link":"dfdff","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"}],"columns":{"desktop":2,"tablet":2,"mobile":1},"themes":{"theme":"theme4"}} /-->'); ?>
                        </div>
                        <div class="theme5">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list {"lists":[{"icon":{"class":"fa-solid fa-star"},"text":"List items with a star","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"http://localhost/wordpress1/wp-content/uploads/2024/03/facebook.png"},{"icon":{"class":"fa-solid fa-check-circle"},"text":"List items with circle","des":"Type your description here","featureDes":"Feature with circle check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fa-solid fa-check-square"},"text":"List items with square check","des":"Type your description here","featureDes":"Feature with square check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"},{"icon":{"class":"fa-solid fa-heart"},"text":"List items with heart","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"},{"icon":{"class":"fas fa-check-square"},"text":"List item with square check","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fas fa-check-square"},"text":"List item with square check","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"}],"width":"641px","columns":{"desktop":3,"tablet":2,"mobile":1},"themes":{"theme":"theme5"}} /-->'); ?>
                        </div>
                        <div class="theme6">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list {"lists":[{"icon":{"class":"fa-solid fa-star"},"text":"List items with a star","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"http://localhost/wordpress1/wp-content/uploads/2024/03/facebook.png"},{"icon":{"class":"fa-solid fa-check-circle"},"text":"List items with circle","des":"Type your description here","featureDes":"Feature with circle check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fa-solid fa-check-square"},"text":"List items with check","des":"Type your description here","featureDes":"Feature with square check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"},{"icon":{"class":"fa-solid fa-heart"},"text":"List items with heart","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"}],"columns":{"desktop":2,"tablet":2,"mobile":1},"listIconColors":{"color":"#fff","bg":"rgba(5, 150, 105, 1)"},"themes":{"theme":"theme6"}} /-->'); ?>
                        </div>
                        <div class="theme7">
                            <?php echo $this->renderTemplate('<!-- wp:ilb/icon-list {"lists":[{"icon":{"class":"fa-solid fa-star"},"text":"List items with a star","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"http://localhost/wordpress1/wp-content/uploads/2024/03/facebook.png"},{"icon":{"class":"fa-solid fa-check-circle"},"text":"List items with circle","des":"Type your description here","featureDes":"Feature with circle check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fa-solid fa-check-square"},"text":"List items with square check","des":"Type your description here","featureDes":"Feature with square check","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"},{"icon":{"class":"fa-solid fa-heart"},"text":"List items with heart","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"},{"icon":{"class":"fas fa-check-square"},"text":"List item with square check","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"},{"icon":{"class":"fas fa-check-square"},"text":"List item with square check","des":"Type your description here","featureDes":"Feature with star","link":"","badgeTitle":"Popular","theme6BtnTitle":"action","uploadIconUrl":"https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"}],"width":"660px","columns":{"desktop":3,"tablet":2,"mobile":1},"themes":{"theme":"theme7"}} /-->'); ?>
                        </div>
                    </div>
                </div>
<?php }

            function adminEnqueueScripts($hook)
            {
                if ('tools_page_icon-list' === $hook) {
                    wp_register_script('ilb-view', ILB_DIR_URL . 'build/view.js', ['react', 'react-dom'], ILB_VERSION);
                    wp_register_style('fontAwesome', ILB_DIR_URL . 'assets/css/font-awesome.min.css', [], ILB_VERSION);
                    wp_register_style('ilb-view', ILB_DIR_URL . 'build/view.css', ['fontAwesome'], ILB_VERSION);

                    wp_enqueue_script('fs', ILB_DIR_URL . 'assets/js/fs.js', [], '1');
                    wp_enqueue_style('ilb-admin-help', ILB_DIR_URL . 'build/admin-help.css', ['ilb-view'], ILB_VERSION);
                    wp_enqueue_script('ilb-admin-help', ILB_DIR_URL . 'build/admin-help.js', ['react', 'react-dom', 'wp-components', 'fs'], ILB_VERSION);
                    wp_set_script_translations('ilb-admin-help', 'icon-list', ILB_DIR_PATH . 'languages');
                }
            }
        }

        new ILBPlugin();
    }
}
