<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* themes/custom/bwood/templates/region--content.html.twig */
class __TwigTemplate_c947bd014244250af07c2694bfa42217 extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 15
        if (($context["is_front"] ?? null)) {
            // line 17
            $context["classes"] = ["row", "mx-0", "px-0", "region", ("region--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(            // line 22
($context["region"] ?? null), 22, $this->source))), "grid-full", "layout--pass--content-medium"];
        } else {
            // line 29
            $context["classes"] = ["row", "mx-0", "px-5", "pt-5", "region", ("region--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(            // line 35
($context["region"] ?? null), 35, $this->source))), "grid-full", "layout--pass--content-medium"];
        }
        // line 41
        yield "
";
        // line 42
        if (($context["content"] ?? null)) {
            // line 43
            yield "  <div";
            yield $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [($context["classes"] ?? null)], "method", false, false, true, 43), 43, $this->source), "html", null, true);
            yield " id=\"content\">
    ";
            // line 44
            yield $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["content"] ?? null), 44, $this->source), "html", null, true);
            yield "
  </div>
";
        }
        // line 47
        yield "
";
        $this->env->getExtension('\Drupal\Core\Template\TwigExtension')
            ->checkDeprecations($context, ["is_front", "region", "content", "attributes"]);        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "themes/custom/bwood/templates/region--content.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  70 => 47,  64 => 44,  59 => 43,  57 => 42,  54 => 41,  51 => 35,  50 => 29,  47 => 22,  46 => 17,  44 => 15,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "themes/custom/bwood/templates/region--content.html.twig", "/home1/brookwoo/public_html/themes/custom/bwood/templates/region--content.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 15, "set" => 17);
        static $filters = array("clean_class" => 22, "escape" => 43);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                ['clean_class', 'escape'],
                [],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
